#!/usr/bin/env python3
"""Fetch software-card stars and latest releases during the site build."""

from __future__ import annotations

import json
import os
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
SOFTWARE_PAGE = ROOT / "content" / "software" / "_index.md"
OUTPUT = ROOT / "static" / "github-software.json"
API_ROOT = "https://api.github.com/repos"
REPO_FIELD_PATTERN = re.compile(r"^[ \t]+repo:[ \t]*(.+)$", re.MULTILINE)
REPO_VALUE_PATTERN = re.compile(
    r"(['\"]?)([A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)\1(?:[ \t]+#.*)?"
)


def request_json(url: str, token: str, attempts: int = 3) -> dict:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "Lhongpei.github.io metadata builder",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    for attempt in range(attempts):
        try:
            with urlopen(Request(url, headers=headers), timeout=20) as response:
                return json.load(response)
        except (HTTPError, URLError, TimeoutError):
            if attempt == attempts - 1:
                raise
            time.sleep(2**attempt)

    raise RuntimeError("unreachable")


def find_repositories() -> list[str]:
    page = SOFTWARE_PAGE.read_text(encoding="utf-8")
    frontmatter = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", page, re.DOTALL)
    if not frontmatter:
        raise RuntimeError("Software page is missing YAML front matter")

    # Project repository names are single-line fields in the page configuration.
    repositories = []
    for value in REPO_FIELD_PATTERN.findall(frontmatter.group(1)):
        match = REPO_VALUE_PATTERN.fullmatch(value.strip())
        if not match:
            raise RuntimeError(f"Invalid software repository: {value!r}")
        repositories.append(match.group(2))
    if not repositories:
        raise RuntimeError("No software repositories found; refusing to publish empty metadata")
    return sorted(set(repositories))


def build_metadata(token: str) -> dict:
    repositories: dict[str, dict[str, object]] = {}
    for repository in find_repositories():
        details = request_json(f"{API_ROOT}/{repository}", token)
        release = request_json(f"{API_ROOT}/{repository}/releases/latest", token)
        repositories[repository] = {
            "stars": details["stargazers_count"],
            "release": release["tag_name"],
        }

    return {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "repositories": repositories,
    }


def main() -> None:
    metadata = build_metadata(os.environ.get("GITHUB_TOKEN", ""))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(
        f"Updated {len(metadata['repositories'])} repositories in "
        f"{OUTPUT.relative_to(ROOT)}"
    )


if __name__ == "__main__":
    main()
