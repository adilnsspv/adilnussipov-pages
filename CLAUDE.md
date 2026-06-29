# adilnussipov.com — Project Context

## What this is
Personal writing site for Adil Nussipov, built with Eleventy (11ty) and deployed on Cloudflare Pages. Styled after craigmod.com — typography-first, minimal, serif body text, generous whitespace.

## Live site
- **Production:** https://adilnussipov.com
- **Cloudflare Pages project:** adilnussipov-pages (at dash.cloudflare.com)
- **GitHub repo:** https://github.com/adilnsspv/adilnussipov-pages

## Local setup
- **Project root:** `/Users/vibefort/adilnussipov-site`
- **Run locally:** `npm start` → http://localhost:8080
- **Build:** `npx @11ty/eleventy`

## File structure
```
index.njk                  ← homepage (bio + recent articles)
about/index.njk            ← about page
writing/index.njk          ← full article list
writing/posts/*.md         ← articles (add here to publish)
writing/posts/posts.json   ← default front matter for posts
_includes/base.njk         ← shared layout (header, nav, footer)
_includes/article.njk      ← article page layout
css/style.css              ← all styles
.eleventy.js               ← Eleventy config
```

## Publishing workflow
1. Create `writing/posts/article-slug.md` with front matter:
   ```
   ---
   title: Article Title
   description: One-line summary shown under the title.
   date: YYYY-MM-DD
   ---
   ```
2. Write content in markdown
3. `git add writing/posts/article-slug.md`
4. `git commit -m "Add: Article Title"`
5. `git push origin main`
6. Cloudflare auto-deploys in ~1 minute

## IMPORTANT: Deployment rule
After implementing any changes, ALWAYS stop and ask Adil for permission before running `git push`. Committing locally is fine without asking, but never push to origin without explicit approval — pushing triggers a live Cloudflare deployment.

## Design principles (follow craigmod.com closely)
- Serif body text: "Iowan Old Style" → Georgia fallback
- Sans-serif for nav, dates, labels — uppercase, letter-spacing
- Blue link underlines: #007AFC
- Content max-width: 680px
- Dark mode via `prefers-color-scheme`
- No clutter — whitespace is the design

## Git remote
`origin` → https://github.com/adilnsspv/adilnussipov-pages.git (this is what Cloudflare watches)

## Cloudflare build settings
- Build command: `npx @11ty/eleventy`
- Output directory: `_site`
- Deploy command: (empty)
