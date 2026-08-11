"""Unpack markdown <stem>/images.tar.xz into local images/ (gitignored).

Skips stems whose local images/ fingerprint already matches images.sha256,
unless --force is set. Also accepts legacy uncompressed images.tar.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from markdown_image_bundles import (
    TAR_NAME,
    Timed,
    format_duration,
    iter_stem_bundles,
    read_fingerprint,
    repo_rel,
    tree_fingerprint,
    unpack_images_tar,
)


def resolve_bundle_path(bundle) -> Path | None:
    if bundle.tar_path.is_file():
        return bundle.tar_path
    if bundle.legacy_tar_path.is_file():
        return bundle.legacy_tar_path
    return None


def unpack_one(stem: str, *, force: bool, dry_run: bool) -> str:
    bundle = iter_stem_bundles(stem=stem)[0]
    archive = resolve_bundle_path(bundle)
    if archive is None:
        return f"SKIP  {stem}: missing {TAR_NAME}"

    recorded = read_fingerprint(bundle.fingerprint_path)
    if not force and recorded and bundle.images_dir.is_dir():
        current, count = tree_fingerprint(bundle.images_dir)
        if current == recorded:
            return f"SKIP  {stem}: already unpacked ({count} files, sha256={recorded[:12]}…)"

    action = "UNPACK" if not dry_run else "DRY"
    if dry_run:
        return f"{action}  {stem}: would extract {repo_rel(archive)}"

    with Timed() as t:
        n = unpack_images_tar(archive, bundle.images_dir, clean=True)
    if recorded:
        current, _ = tree_fingerprint(bundle.images_dir)
        if current != recorded:
            return (
                f"WARN  {stem}: extracted {n} files in {format_duration(t.elapsed)} "
                f"but fingerprint mismatch "
                f"(got {current[:12]}…, expected {recorded[:12]}…). "
                f"Re-run pack or refresh images.sha256."
            )
    return (
        f"UNPACK  {stem}: {n} files -> {repo_rel(bundle.images_dir)} "
        f"({format_duration(t.elapsed)})"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--stem",
        action="append",
        dest="stems",
        help="Only unpack this stem (repeatable). Default: all stems with image archives",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-extract even when local fingerprint matches",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be unpacked without writing",
    )
    args = parser.parse_args()

    if args.stems:
        stems = args.stems
    else:
        stems = [
            b.stem
            for b in iter_stem_bundles()
            if b.tar_path.is_file() or b.legacy_tar_path.is_file()
        ]

    if not stems:
        print(f"No stems with {TAR_NAME} (or legacy images.tar) found.", file=sys.stderr)
        return 1

    unpacked = skipped = warnings = 0
    for stem in stems:
        line = unpack_one(stem, force=args.force, dry_run=args.dry_run)
        print(line)
        if line.startswith("UNPACK") or line.startswith("DRY"):
            unpacked += 1
        elif line.startswith("WARN"):
            warnings += 1
        else:
            skipped += 1

    print(f"Done: {unpacked} unpack/dry, {skipped} skipped, {warnings} warnings.")
    return 1 if warnings else 0


if __name__ == "__main__":
    raise SystemExit(main())
