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
- Serif body text: Charter → Iowan Old Style → Georgia fallback (Charter is the primary — it's a macOS system font that matches craigmod.com's density and stroke weight)
- Body text color: `#111` (near-black, not gray — matches craigmod.com ink density)
- Body font size: `2.05em` (base `html` is `62.5%`, so `1rem = 10px`)
- Body line-height: `1.55`
- Sans-serif for nav, dates, labels — uppercase, letter-spacing
- Link accent color: #C0392B (warm red), not blue
- Content max-width: 680px
- Site name in header: `1.6rem`, bold — visibly larger than nav links (`1.3rem`) for clear identity hierarchy
- Avatar size: `36×36px`
- Dark mode via `prefers-color-scheme`
- No clutter — whitespace is the design

## Doodle / hand-drawn design layer
The site has a pen-sketch aesthetic layered over the minimal typography:
- **Header divider**: wavy SVG line replacing the solid `border-bottom`
- **Article list hover**: bold red wavy underline draws left-to-right under the title (`background-size` animation on h3), followed by a circled grade letter springing in to the right
- **Grade system**: add `grade: A` (or B, B+, A- etc.) to a post's front matter to show a circled grade mark on hover. Posts without a grade still get the underline animation
- **Do NOT add a pen/cursor icon** to the underline animation — was tried and removed, doesn't fit the design
- All hand-drawn elements use SVG stroke paths (same weight/style), never raster images or emoji

## Git remote
`origin` → https://github.com/adilnsspv/adilnussipov-pages.git (this is what Cloudflare watches)

## Cloudflare build settings
- Build command: `npx @11ty/eleventy`
- Output directory: `_site`
- Deploy command: (empty)
