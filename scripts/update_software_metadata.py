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
REPO_PATTERN = re.compile(r'data-repo="([A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)"')


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
    repositories = REPO_PATTERN.findall(SOFTWARE_PAGE.read_text(encoding="utf-8"))
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


def update_embedded_values(metadata: dict) -> None:
    page = SOFTWARE_PAGE.read_text(encoding="utf-8")
    for repository, values in metadata["repositories"].items():
        replacements = (("sw-stars", "stars"), ("sw-ver", "release"))
        for css_class, key in replacements:
            pattern = re.compile(
                rf'(<span class="{css_class}" data-repo="{re.escape(repository)}">)'
                r"[^<]*(</span>)"
            )
            page, count = pattern.subn(
                lambda match: f"{match.group(1)}{values[key]}{match.group(2)}",
                page,
            )
            if count != 1:
                raise RuntimeError(
                    f"Expected one {css_class} element for {repository}, found {count}"
                )

    SOFTWARE_PAGE.write_text(page, encoding="utf-8")


def main() -> None:
    metadata = build_metadata(os.environ.get("GITHUB_TOKEN", ""))
    update_embedded_values(metadata)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(
        f"Updated {len(metadata['repositories'])} repositories in "
        f"{SOFTWARE_PAGE.relative_to(ROOT)} and {OUTPUT.relative_to(ROOT)}"
    )


if __name__ == "__main__":
    main()
