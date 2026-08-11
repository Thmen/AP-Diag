"""Shared helpers for packing / unpacking markdown images.tar.xz bundles."""
from __future__ import annotations

import hashlib
import tarfile
import time
from dataclasses import dataclass
from pathlib import Path

from dm_markdown_common import MARKDOWN_DIR, ROOT

IMAGE_DIR_NAME = "images"
TAR_NAME = "images.tar.xz"
FINGERPRINT_NAME = "images.sha256"
FIXED_MTIME = 0
FIXED_MODE = 0o644
XZ_PRESET = 6

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"}


@dataclass(frozen=True)
class StemBundle:
    stem: str
    stem_dir: Path

    @property
    def images_dir(self) -> Path:
        return self.stem_dir / IMAGE_DIR_NAME

    @property
    def tar_path(self) -> Path:
        return self.stem_dir / TAR_NAME

    @property
    def fingerprint_path(self) -> Path:
        return self.stem_dir / FINGERPRINT_NAME


def iter_stem_bundles(
    markdown_dir: Path | None = None,
    *,
    stem: str | None = None,
) -> list[StemBundle]:
    base = markdown_dir or MARKDOWN_DIR
    if stem:
        d = base / stem
        if not d.is_dir():
            raise FileNotFoundError(f"stem directory not found: {d}")
        return [StemBundle(stem=stem, stem_dir=d)]

    bundles: list[StemBundle] = []
    for child in sorted(base.iterdir()):
        if not child.is_dir() or child.name.startswith(("_", ".")):
            continue
        bundles.append(StemBundle(stem=child.name, stem_dir=child))
    return bundles


def list_image_files(images_dir: Path) -> list[Path]:
    if not images_dir.is_dir():
        return []
    files = [
        p
        for p in images_dir.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES
    ]
    return sorted(files, key=lambda p: p.relative_to(images_dir).as_posix())


def tree_fingerprint(images_dir: Path) -> tuple[str, int]:
    """Content fingerprint of images/ (path order + per-file sha256)."""
    files = list_image_files(images_dir)
    h = hashlib.sha256()
    for path in files:
        rel = path.relative_to(images_dir).as_posix()
        h.update(rel.encode("utf-8"))
        h.update(b"\0")
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        h.update(digest.encode("ascii"))
        h.update(b"\0")
    return h.hexdigest(), len(files)


def read_fingerprint(path: Path) -> str | None:
    if not path.is_file():
        return None
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("sha256="):
            return line.removeprefix("sha256=").strip().lower()
        if len(line) == 64 and all(c in "0123456789abcdef" for c in line.lower()):
            return line.lower()
    return None


def write_fingerprint(path: Path, digest: str, *, file_count: int) -> None:
    path.write_text(
        (
            "# Markdown images tree fingerprint (sorted relpath + content sha256)\n"
            f"sha256={digest}\n"
            f"files={file_count}\n"
        ),
        encoding="utf-8",
        newline="\n",
    )


def pack_images_tar(images_dir: Path, tar_path: Path) -> int:
    """Write deterministic xz-compressed tar (preset=XZ_PRESET); returns file count."""
    files = list_image_files(images_dir)
    if not files:
        raise FileNotFoundError(f"no image files under {images_dir}")

    tar_path.parent.mkdir(parents=True, exist_ok=True)
    tmp = tar_path.with_name(tar_path.name + ".tmp")
    if tmp.exists():
        tmp.unlink()

    with tarfile.open(tmp, mode="w:xz", preset=XZ_PRESET) as tar:
        for path in files:
            rel = path.relative_to(images_dir).as_posix()
            info = tarfile.TarInfo(name=rel)
            info.size = path.stat().st_size
            info.mtime = FIXED_MTIME
            info.mode = FIXED_MODE
            info.type = tarfile.REGTYPE
            info.uid = 0
            info.gid = 0
            info.uname = ""
            info.gname = ""
            with path.open("rb") as fh:
                tar.addfile(info, fh)

    tmp.replace(tar_path)
    return len(files)


def unpack_images_tar(tar_path: Path, images_dir: Path, *, clean: bool = True) -> int:
    if not tar_path.is_file():
        raise FileNotFoundError(f"missing tar: {tar_path}")

    if clean and images_dir.exists():
        for path in sorted(images_dir.rglob("*"), reverse=True):
            if path.is_file():
                path.unlink()
            elif path.is_dir():
                try:
                    path.rmdir()
                except OSError:
                    pass
    images_dir.mkdir(parents=True, exist_ok=True)

    extract_kwargs: dict = {}
    if hasattr(tarfile, "data_filter"):
        extract_kwargs["filter"] = "data"

    count = 0
    with tarfile.open(tar_path, mode="r:xz") as tar:
        members = [m for m in tar.getmembers() if m.isfile()]
        members.sort(key=lambda m: m.name)
        for member in members:
            name = member.name.replace("\\", "/")
            if name.startswith("/") or ".." in name.split("/"):
                raise ValueError(f"unsafe tar member: {member.name}")
            if name.startswith("images/"):
                name = name.removeprefix("images/")
            member.name = name
            tar.extract(member, path=images_dir, **extract_kwargs)
            count += 1
    return count


def repo_rel(path: Path) -> str:
    try:
        return path.resolve().relative_to(ROOT.resolve()).as_posix()
    except ValueError:
        return str(path)


def format_duration(seconds: float) -> str:
    if seconds < 60:
        return f"{seconds:.1f}s"
    mins, secs = divmod(seconds, 60)
    return f"{int(mins)}m{secs:04.1f}s"


class Timed:
    """Simple wall-clock timer."""

    def __init__(self) -> None:
        self.elapsed = 0.0

    def __enter__(self) -> Timed:
        self._t0 = time.perf_counter()
        return self

    def __exit__(self, *args: object) -> None:
        self.elapsed = time.perf_counter() - self._t0
