#!/bin/sh
# Downscale photos before committing them.
#
#   _tools/optimize-photo.sh news/2026-3-graduation/*.png
#
# A photo straight off a phone is 5712x4284 and 15-20 MB. Quarto copies it into
# _site/ untouched, so every visitor downloads all of it — the 2025 graduation
# post shipped 37 MB before this was cleaned up. Displayed at width=50% on a
# ~900 px column, anything past a 1600 px long edge is invisible even on retina.
#
# For each file this:
#   1. resizes so the long edge is at most 1600 px,
#   2. re-encodes PNG as JPEG (a photo as PNG is ~50x larger for no gain),
#   3. rewrites references to the old filename in the sibling index.qmd,
#   4. deletes the original.
#
# Idempotent: a file already within limits is reported and left alone. Uses
# sips, which is part of macOS — there is nothing to install.
#
# Screenshots, diagrams, and line art should NOT go through this. JPEG smears
# hard edges and text; keep those as PNG, or better, export them as SVG.

set -eu

MAX_EDGE=1600
JPEG_QUALITY=82

command -v sips >/dev/null 2>&1 || {
	echo "error: sips not found — this script needs macOS." >&2
	exit 1
}

[ "$#" -gt 0 ] || {
	echo "usage: $0 <image> [image ...]" >&2
	exit 2
}

# sips prints "  pixelWidth: 5712"; take the last whitespace-separated field.
dimension() {
	sips -g "$2" "$1" | tail -1 | awk '{print $NF}'
}

human() {
	awk -v b="$1" 'BEGIN { printf (b < 1048576) ? "%.0f KB" : "%.2f MB",
		(b < 1048576) ? b/1024 : b/1048576 }'
}

total_before=0
total_after=0

for src in "$@"; do
	if [ ! -f "$src" ]; then
		echo "skip  $src — not a file"
		continue
	fi

	before=$(wc -c <"$src" | tr -d ' ')
	width=$(dimension "$src" pixelWidth)
	height=$(dimension "$src" pixelHeight)

	case "$width$height" in
	*[!0-9]* | "")
		echo "skip  $src — not an image sips can read"
		continue
		;;
	esac

	# Longest edge, and whether the format is already right.
	long=$width
	[ "$height" -gt "$long" ] && long=$height
	ext=$(printf '%s' "${src##*.}" | tr '[:upper:]' '[:lower:]')

	case "$ext" in
	png) dst="${src%.*}.jpg" ;;
	jpg | jpeg) dst="$src" ;;
	*)
		echo "skip  $src — only .png/.jpg/.jpeg are handled"
		continue
		;;
	esac

	if [ "$long" -le "$MAX_EDGE" ] && [ "$dst" = "$src" ]; then
		echo "ok    $src — ${width}x${height}, $(human "$before"), already within limits"
		total_before=$((total_before + before))
		total_after=$((total_after + before))
		continue
	fi

	if [ "$dst" != "$src" ] && [ -e "$dst" ]; then
		echo "skip  $src — $dst already exists, refusing to overwrite" >&2
		continue
	fi

	sips -Z "$MAX_EDGE" \
		--setProperty format jpeg \
		--setProperty formatOptions "$JPEG_QUALITY" \
		"$src" --out "$dst" >/dev/null

	after=$(wc -c <"$dst" | tr -d ' ')
	total_before=$((total_before + before))
	total_after=$((total_after + after))

	echo "done  $src"
	echo "      ${width}x${height} $(human "$before")  ->  $(dimension "$dst" pixelWidth)x$(dimension "$dst" pixelHeight) $(human "$after")"

	# Renaming .png to .jpg breaks any ![](IMG_1424.png) next door. Post images
	# live beside their post, so the sibling index.qmd is the one to fix.
	if [ "$dst" != "$src" ]; then
		qmd="$(dirname "$src")/index.qmd"
		old=$(basename "$src")
		new=$(basename "$dst")
		if [ -f "$qmd" ] && grep -qF "$old" "$qmd"; then
			# Escape the dot so sed does not treat it as "any character".
			sed -i '' "s/$(printf '%s' "$old" | sed 's/\./\\./g')/$new/g" "$qmd"
			echo "      updated reference in $qmd: $old -> $new"
		elif [ -f "$qmd" ]; then
			echo "      note: $qmd does not mention $old — check other pages by hand"
		fi
		rm "$src"
	fi
done

if [ "$total_before" -gt 0 ] && [ "$total_after" -ne "$total_before" ]; then
	echo
	echo "total $(human "$total_before")  ->  $(human "$total_after")"
fi
