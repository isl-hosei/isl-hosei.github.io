#!/bin/sh
# Rebuild favicon.ico and apple-touch-icon.png from favicon.svg.
#
# Run from the repo root after editing favicon.svg:
#   sh _tools/make-favicon.sh
#
# Needs rsvg-convert (brew install librsvg) and Pillow (pip install pillow).
#
# Why the raster copies still exist alongside the SVG: Safari only began
# honouring SVG favicons recently, and Windows/pinned-tab surfaces still ask
# for .ico. The .ico carries 16/32/48 rasterised *separately from the vector*
# rather than one 48px image downscaled by the browser — that downscale is what
# made the old single-size icons soft in the tab strip.
set -eu

SRC=favicon.svg
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

for s in 16 32 48; do
  rsvg-convert -w $s -h $s "$SRC" -o "$TMP/$s.png"
done

python3 - "$TMP" <<'PY'
import sys
from PIL import Image

tmp = sys.argv[1]
sizes = [16, 32, 48]
imgs = [Image.open(f"{tmp}/{s}.png").convert("RGBA") for s in sizes]
imgs[-1].save(
    "favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in sizes],
    append_images=imgs[:-1],
)
PY

# apple-touch-icon is masked to iOS's own superellipse. Feeding it our rounded
# tile would round the corners twice and leave dark slivers, so the corner
# radius is dropped for this one render and the square bleeds to the edge.
sed 's/ rx="14"//' "$SRC" > "$TMP/square.svg"
rsvg-convert -w 180 -h 180 "$TMP/square.svg" -o apple-touch-icon.png

echo "wrote favicon.ico (16/32/48) and apple-touch-icon.png (180)"
