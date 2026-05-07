#!/usr/bin/env bash
set -e
rm -rf _site
mkdir -p _site
cp index.html _site/
cp portfolio.js _site/ 2>/dev/null || true
cp project*.jpg _site/ 2>/dev/null || true
for d in project1 project2 project3 project4 project5 project6; do
  if [ -d "$d" ]; then cp -r "$d" "_site/$d"; fi
done
echo "Built $(find _site -type f | wc -l) files into _site/"
