#!/usr/bin/env python3
"""
Version bump script for CultureCoded Python SDK

Usage:
    python scripts/version.py patch   # 1.0.0 -> 1.0.1
    python scripts/version.py minor   # 1.0.0 -> 1.1.0
    python scripts/version.py major   # 1.0.0 -> 2.0.0
    python scripts/version.py 1.2.3   # Set specific version
"""

import re
import sys
from datetime import date
from pathlib import Path


def get_current_version(pyproject_path: Path) -> str:
    """Read current version from pyproject.toml."""
    content = pyproject_path.read_text()
    match = re.search(r'version\s*=\s*"([^"]+)"', content)
    if not match:
        raise ValueError("Could not find version in pyproject.toml")
    return match.group(1)


def bump_version(current: str, bump_type: str) -> str:
    """Calculate new version based on bump type."""
    parts = current.split(".")
    major, minor, patch = int(parts[0]), int(parts[1]), int(parts[2])
    
    if bump_type == "major":
        return f"{major + 1}.0.0"
    elif bump_type == "minor":
        return f"{major}.{minor + 1}.0"
    elif bump_type == "patch":
        return f"{major}.{minor}.{patch + 1}"
    elif re.match(r"^\d+\.\d+\.\d+$", bump_type):
        return bump_type
    else:
        raise ValueError(f"Invalid version type: {bump_type}")


def update_pyproject(pyproject_path: Path, new_version: str) -> None:
    """Update version in pyproject.toml."""
    content = pyproject_path.read_text()
    updated = re.sub(
        r'version\s*=\s*"[^"]+"',
        f'version = "{new_version}"',
        content
    )
    pyproject_path.write_text(updated)
    print(f"Updated pyproject.toml to version {new_version}")


def update_init(init_path: Path, new_version: str) -> None:
    """Update __version__ in __init__.py."""
    content = init_path.read_text()
    updated = re.sub(
        r'__version__\s*=\s*"[^"]+"',
        f'__version__ = "{new_version}"',
        content
    )
    init_path.write_text(updated)
    print(f"Updated __init__.py to version {new_version}")


def update_changelog(changelog_path: Path, new_version: str) -> None:
    """Update CHANGELOG.md with new version."""
    content = changelog_path.read_text()
    today = date.today().isoformat()
    
    updated = content.replace(
        "## [Unreleased]",
        f"## [Unreleased]\n\n## [{new_version}] - {today}"
    )
    changelog_path.write_text(updated)
    print(f"Updated CHANGELOG.md for version {new_version}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/version.py <patch|minor|major|x.y.z>")
        sys.exit(1)
    
    bump_type = sys.argv[1]
    sdk_root = Path(__file__).parent.parent
    
    pyproject_path = sdk_root / "pyproject.toml"
    init_path = sdk_root / "culturecoded" / "__init__.py"
    changelog_path = sdk_root / "CHANGELOG.md"
    
    current_version = get_current_version(pyproject_path)
    new_version = bump_version(current_version, bump_type)
    
    print(f"Bumping version: {current_version} -> {new_version}")
    
    update_pyproject(pyproject_path, new_version)
    update_init(init_path, new_version)
    update_changelog(changelog_path, new_version)
    
    print(f"\nVersion bumped to {new_version}")
    print("\nNext steps:")
    print(f'  1. Add changes to CHANGELOG.md under [Unreleased]')
    print(f'  2. Commit: git commit -am "chore: bump version to {new_version}"')
    print(f'  3. Tag: git tag v{new_version}-python')
    print(f'  4. Push: git push && git push --tags')


if __name__ == "__main__":
    main()
