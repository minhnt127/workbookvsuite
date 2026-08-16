WORKBOOK V-SUITE — CLEAN FINAL SOURCE
=====================================

1) Unzip this archive.
2) Open the folder `workbookvsuite` in VS Code.
3) Open Terminal in VS Code.
4) Run locally:

   corepack enable
   pnpm install
   pnpm dev

5) Open http://localhost:3000

START A FRESH GITHUB REPOSITORY
-------------------------------
Inside the `workbookvsuite` folder run:

   git init
   git add .
   git commit -m "Initial release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main

VERCEL
------
- Import that GitHub repository in Vercel.
- Framework: Next.js
- Root Directory: leave blank / repository root.
- Build command comes from package.json: `next build`.
- This clean package removes the optional Polar webhook that previously broke builds.

NOTES
-----
- Do not copy files from older V17/V18/V19 folders into this project.
- Do not create folders named "app copy", "components copy", etc.
- The source is already cleaned and intended to be the new single source of truth.
