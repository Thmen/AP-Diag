"""Pack markdown <stem>/images/ into deterministic images.tar (Git LFS).

Skips stems whose tree fingerprint already matches images.sha256 and whose
images.tar exists, unless --force is set.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

# Ensure scripts/ is importable when invoked as a file path.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from markdown_image_bundles import (
    iter_stem_bundles,
    pack_images_tar,
    read_fingerprint,
    repo_rel,
    tree_fingerprint,
    write_fingerprint,
)


def pack_one(stem: str, *, force: bool, dry_run: bool) -> str:
    bundle = iter_stem_bundles(stem=stem)[0]
    if not bundle.images_dir.is_dir():
        return f"SKIP  {stem}: no images/ directory"

    digest, count = tree_fingerprint(bundle.images_dir)
    if count == 0:
        return f"SKIP  {stem}: images/ has no image files"

    recorded = read_fingerprint(bundle.fingerprint_path)
    tar_ok = bundle.tar_path.is_file()
    if not force and recorded == digest and tar_ok:
        return f"SKIP  {stem}: unchanged ({count} files, sha256={digest[:12]}…)"

    action = "PACK" if not dry_run else "DRY"
    if dry_run:
        reason = "force" if force else ("new/changed" if recorded != digest else "missing tar")
        return f"{action}  {stem}: would write {count} files ({reason})"

    n = pack_images_tar(bundle.images_dir, bundle.tar_path)
    write_fingerprint(bundle.fingerprint_path, digest, file_count=n)
    size_mb = bundle.tar_path.stat().st_size / (1024 * 1024)
    return (
        f"PACK  {stem}: {n} files -> {repo_rel(bundle.tar_path)} "
        f"({size_mb:.1f} MiB, sha256={digest[:12]}…)"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--stem",
        action="append",
        dest="stems",
        help="Only pack this stem (repeatable). Default: all stems under markdown/",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Repack even when fingerprint and tar already match",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be packed without writing",
    )
    args = parser.parse_args()

    if args.stems:
        stems = args.stems
    else:
        stems = [b.stem for b in iter_stem_bundles() if b.images_dir.is_dir()]

    if not stems:
        print("No stems with images/ found.", file=sys.stderr)
        return 1

    packed = skipped = 0
    for stem in stems:
        line = pack_one(stem, force=args.force, dry_run=args.dry_run)
        print(line)
        if line.startswith("PACK") or line.startswith("DRY"):
            packed += 1
        else:
            skipped += 1

    print(f"Done: {packed} pack/dry, {skipped} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
