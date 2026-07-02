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
reading/index.njk          ← reading log index (years)
reading/year.njk           ← paginated per-year book list (/reading/{year}/)
books/books.yaml           ← reading log data (one block per book)
books/cover-cache.json     ← auto-generated cover lookups (committed; safe to delete)
_data/reading.js           ← loads books.yaml, resolves covers, groups by year
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

## Reading log
The `/reading/` section is a book log grouped by year. All data lives in one file, `books/books.yaml`, with **one block per book** — deliberately YAML, not JSON, so it's forgiving to hand-edit (no trailing-comma or stray-quote traps that break the whole build).

To add a book, copy an existing block in `books/books.yaml` and edit it — normally just three fields:
```yaml
- title: "Book Title"        # keep the double quotes — titles may contain colons
  author: Author Name
  finished: March 2022       # required. "March 2022" | "Mar 2022" | 2022-03 | 2022
  rating: liked              # optional: liked | fine | disliked
  note: >-                   # optional free text; write multiple indented lines,
    A short note about the   # no quotes or commas needed
    book, in your own words.
```
`_data/reading.js` reads the file, groups blocks by year (derived from `finished`, newest first; within a year, newest-finished first) and `reading/year.njk` paginates one page per year. A block with no valid `finished` year is skipped with a build warning.

**Covers are auto-resolved.** For any book without an explicit cover, the build searches Open Library by title + author (retrying without the subtitle if the full title misses) and stores the hit in `books/cover-cache.json`. That cache is committed, so only new/unseen books hit the network and cached builds are offline-fast. To override, add `coverId:`, `isbn:`, or a full `cover:` URL to the block — a manual value always wins. To force a re-lookup, delete that book's entry from `cover-cache.json` (or the whole file). Cover URLs are built by the `bookCover` filter (`.eleventy.js`): `cover` → `coverId` → `isbn` → text-only fallback. Requires Node 18+ for global `fetch` (Cloudflare's default is fine).

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

## iA Writer markdown features
These are implemented via markdown-it plugins in `.eleventy.js`. All use native iA Writer syntax.

- **`==text==`** → `<mark>` (markdown-it-mark)
- **`[^1]` / `[^1]: text`** → footnotes (markdown-it-footnote). Reference-style only; iA Writer's `[^inline]` variant differs from the plugin's `^[inline]` form and is not supported.
- **`[[Post Title]]` or `[[file-slug]]`** → intra-site link. Both title and slug forms resolve. Unmatched titles render as plain text with a build warning. At build time a reverse index drives a "Referenced by" section at the bottom of each article (hidden when empty).
- **Smart typography** — `typographer: true` converts `--`/`---` dashes, `...`, and straight quotes at build time.
- **`{{TOC}}`** on its own line → auto-generated table of contents. Nunjucks evaluates `{{TOC}}` as a global variable → `%%TOC%%` → markdown-it-toc-done-right replaces it. Heading IDs are added by markdown-it-anchor.
- **`>> text`** (nested blockquote) → large-type pull quote. CSS `:has(> blockquote)` removes the outer border and the inner `blockquote blockquote` gets 1.28em font-size, non-italic.
- **`#hashtag`** → link to `/topics/{tag}/`. Only matches `#word` preceded by whitespace (avoids URL fragments). Per-tag pages are generated via `topics/tag.njk` pagination over the `allTags` collection. Tags with only 1 character or starting with a digit are technically supported but discouraged.

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
