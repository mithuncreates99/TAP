#!/usr/bin/env bash
set -e

echo "🚀 Preparing Thelma Agnes Peter Executive Portfolio for GitHub Pages..."
npm install
npm run build

git init
git add .
git commit -m "feat: complete executive portfolio with bound 9.0s dual-video state machine" || true
echo "✅ Build verified and committed! Push to your GitHub remote with:"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/<your-username>/<your-repo>.git"
echo "   git push -u origin main"
