#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/render-latex-standalones.sh [article-directory]

Compile standalone TikZ .tex files in the article directory to PDF and WebP.
Outputs are placed in <article-directory>/rendered.

Examples:
  scripts/render-latex-standalones.sh drafts/cross-lora
  scripts/render-latex-standalones.sh drafts/my-article

Requires latexmk, pdftoppm, and ImageMagick (magick).
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$#" -gt 1 ]]; then
  usage >&2
  exit 2
fi

article_dir="${1:-drafts/cross-lora}"
if [[ ! -d "$article_dir" ]]; then
  printf 'Error: article directory not found: %s\n' "$article_dir" >&2
  exit 2
fi

for command in latexmk pdftoppm magick; do
  if ! command -v "$command" >/dev/null 2>&1; then
    printf 'Error: required command not found: %s\n' "$command" >&2
    exit 127
  fi
done

article_dir="$(cd "$article_dir" && pwd)"
rendered_dir="$article_dir/rendered"
mkdir -p "$rendered_dir"

tex_files=()
while IFS= read -r -d '' tex_file; do
  tex_files+=("$tex_file")
done < <(find "$article_dir" -type f -name '*.tex' ! -path "$rendered_dir/*" -print0 | sort -z)

if [[ "${#tex_files[@]}" -eq 0 ]]; then
  printf 'No .tex files found in %s\n' "$article_dir" >&2
  exit 1
fi

for tex_file in "${tex_files[@]}"; do
  filename="$(basename "$tex_file" .tex)"
  printf 'Rendering %s\n' "$tex_file"

  latexmk -pdf -interaction=nonstopmode -halt-on-error \
    -outdir="$rendered_dir" "$tex_file"

  pdf_file="$rendered_dir/$filename.pdf"
  if [[ ! -f "$pdf_file" ]]; then
    printf 'Error: expected PDF was not created: %s\n' "$pdf_file" >&2
    exit 1
  fi

  temp_prefix="$rendered_dir/.${filename}-page"
  pdftoppm -f 1 -l 1 -singlefile -r 180 -png "$pdf_file" "$temp_prefix"
  magick "${temp_prefix}.png" -quality 90 "$rendered_dir/$filename.webp"
  rm -- "${temp_prefix}.png"
done

# latexmk leaves auxiliary files beside the PDFs. Keep the output directory
# limited to the deliverables after the full batch has rendered successfully.
find "$rendered_dir" -maxdepth 1 -type f \
  ! -name '*.pdf' ! -name '*.webp' -delete

printf 'Rendered %d standalone file(s) to %s\n' "${#tex_files[@]}" "$rendered_dir"
