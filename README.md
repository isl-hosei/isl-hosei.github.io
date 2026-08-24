# Intelligent Systems Lab — Website

Source for the [Intelligent Systems Laboratory](https://isl-hosei.github.io/) at Hosei University (法政大学 理工学部 経営システム工学科).

Built with [Quarto](https://quarto.org/) and deployed to GitHub Pages.

```sh
quarto preview   # local dev server with live reload
quarto render    # build into _site/ (gitignored)
```

## Layout

| Path | What it holds |
|---|---|
| `_quarto.yml` | Site config: navbar, theme pairing, render list, OG/Twitter cards |
| `*.qmd` (root) | Top-level pages. The path **is** the URL — `people.qmd` publishes to `/people.html` — so these have to stay at the root |
| `news/`, `research/`, `join/` | Listing sections. One folder per entry, each with an `index.qmd`; the section's `_metadata.yml` sets shared front matter |
| `data/` | YAML feeding the People page listings. Not `_data/` — Quarto skips underscore-prefixed directories when resolving listing `contents:`, and the listings silently render empty |
| `scss/` | `custom.scss` (light) and `dark_custom.scss` (dark) set variables and both import `_shared.scss`, which holds every rule |
| `footer.html` | Injected into every page via `include-after-body` |
| `images/` | Site-wide assets, copied wholesale via `resources:`. Per-post images live next to their `index.qmd` |
| `_tools/` | Build helpers, never published — `optimize-photo.sh` (see below) and `og-image.src.html`, the source for `images/og-image.png` (regeneration steps are in its header comment) |
| `delete/` | Local staging for files on their way out. Gitignored **and** excluded from the render list — Quarto does not read `.gitignore` |

Conventions for writing pages — punctuation, YAML, raw-HTML pitfalls — are in [STYLE.md](STYLE.md).

## Adding photos to a post

Run every photo through this before committing it:

```sh
_tools/optimize-photo.sh news/2026-3-graduation/*.png
```

It caps the long edge at 1600 px, re-encodes PNG photos as JPEG, fixes the
filename in the sibling `index.qmd`, and removes the original. Re-running it is
safe — files already within limits are left alone.

This matters more than it looks: Quarto copies post images into `_site/`
untouched, so a straight-off-the-phone shot (5712×4284, 15–20 MB) is downloaded
in full by every visitor. Displayed at `width=50%`, none of that detail is
visible. Skip the script for screenshots, diagrams, and line art — JPEG smears
hard edges and text, so keep those as PNG or export them as SVG.

## Notes
- Footer and card icons come from [Bootstrap Icons](https://icons.getbootstrap.com), which Quarto bundles — use them as `<i class="bi bi-name"></i>`.
