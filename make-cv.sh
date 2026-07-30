#!/bin/sh
# Renders index.html to the two CV PDFs the Save CV button serves.
# Run after changing CV content, then commit the PDFs — GitHub Pages has no build step.
set -e

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v chromium || command -v google-chrome)"
[ -x "$CHROME" ] || { echo "Chrome not found — install it or set CHROME"; exit 1; }

DIR="$(cd "$(dirname "$0")" && pwd)"

for LANG_CODE in en ro; do
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=5000 \
    --print-to-pdf="$DIR/cv-sergiu-frunza-$LANG_CODE.pdf" \
    "file://$DIR/index.html?lang=$LANG_CODE" 2>/dev/null
  echo "wrote cv-sergiu-frunza-$LANG_CODE.pdf"
done
