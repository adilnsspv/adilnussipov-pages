const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItMark = require("markdown-it-mark");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTocDoneRight = require("markdown-it-toc-done-right");

const slugify = s =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Module-level state — cleared and rebuilt on every Eleventy build/rebuild.
// Populated during collection phase; consumed during render phase.
const postsByTitle = new Map();   // lowercase title → { url, title }
const backlinksCache = new Map(); // pageUrl → [{ title, url }]

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
})
  .use(markdownItMark)
  .use(markdownItFootnote)
  .use(markdownItAnchor, { slugify })
  .use(markdownItTocDoneRight, {
    placeholder: "(%%TOC%%)",
    slugify,
    containerClass: "table-of-contents",
    listType: "ul",
  });

// Wiki-link rule: [[Post Title]] → <a class="wikilink"> or plain text + build warning
md.core.ruler.push("wikilinks", state => {
  const pattern = /\[\[([^\]]+)\]\]/g;
  for (const blockToken of state.tokens) {
    if (blockToken.type !== "inline" || !blockToken.children) continue;
    const next = [];
    let insideLink = 0;
    for (const token of blockToken.children) {
      if (token.type === "link_open")  { insideLink++; next.push(token); continue; }
      if (token.type === "link_close") { insideLink--; next.push(token); continue; }
      if (insideLink > 0 || token.type !== "text" || !token.content.includes("[[")) {
        next.push(token); continue;
      }
      const text = token.content;
      let last = 0;
      pattern.lastIndex = 0;
      let m;
      while ((m = pattern.exec(text)) !== null) {
        if (m.index > last) {
          const t = new state.Token("text", "", 0);
          t.content = text.slice(last, m.index);
          next.push(t);
        }
        const linkTitle = m[1].trim();
        const target = postsByTitle.get(linkTitle.toLowerCase());
        if (target) {
          const open = new state.Token("link_open", "a", 1);
          open.attrSet("href", target.url);
          open.attrSet("class", "wikilink");
          next.push(open);
          const txt = new state.Token("text", "", 0);
          txt.content = linkTitle;
          next.push(txt);
          next.push(new state.Token("link_close", "a", -1));
        } else {
          console.warn(`[wikilink] No post matched title: "${linkTitle}"`);
          const t = new state.Token("text", "", 0);
          t.content = linkTitle;
          next.push(t);
        }
        last = m.index + m[0].length;
      }
      if (last < text.length) {
        const t = new state.Token("text", "", 0);
        t.content = text.slice(last);
        next.push(t);
      }
    }
    blockToken.children = next;
  }
});

// Hashtag rule: #word → <a class="tag-link" href="/topics/word/">
// Stops at hyphens/punctuation (only [A-Za-z0-9_] after #).
// Skipped inside links and non-text tokens (code, images, etc.).
md.core.ruler.push("hashtags", state => {
  const pattern = /#([A-Za-z0-9_]+)/g;
  for (const blockToken of state.tokens) {
    if (blockToken.type !== "inline" || !blockToken.children) continue;
    const next = [];
    let insideLink = 0;
    for (const token of blockToken.children) {
      if (token.type === "link_open")  { insideLink++; next.push(token); continue; }
      if (token.type === "link_close") { insideLink--; next.push(token); continue; }
      if (insideLink > 0 || token.type !== "text" || !token.content.includes("#")) {
        next.push(token); continue;
      }
      const text = token.content;
      let last = 0;
      pattern.lastIndex = 0;
      let m;
      while ((m = pattern.exec(text)) !== null) {
        if (m.index > last) {
          const t = new state.Token("text", "", 0);
          t.content = text.slice(last, m.index);
          next.push(t);
        }
        const tagName = m[1].toLowerCase();
        const open = new state.Token("link_open", "a", 1);
        open.attrSet("href", `/topics/${tagName}/`);
        open.attrSet("class", "tag-link");
        next.push(open);
        const txt = new state.Token("text", "", 0);
        txt.content = `#${m[1]}`;
        next.push(txt);
        next.push(new state.Token("link_close", "a", -1));
        last = m.index + m[0].length;
      }
      if (last < text.length) {
        const t = new state.Token("text", "", 0);
        t.content = text.slice(last);
        next.push(t);
      }
    }
    blockToken.children = next;
  }
});

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.setLibrary("md", md);

  // {{TOC}} in a .md file → Nunjucks sees {{ TOC }} → outputs "%%TOC%%" →
  // markdown-it-toc-done-right matches "%%TOC%%" and inserts the generated TOC.
  eleventyConfig.addGlobalData("TOC", "%%TOC%%");

  // Called from article.njk: look up which posts link to the current page.
  eleventyConfig.addFilter("getBacklinks", pageUrl => {
    return backlinksCache.get(pageUrl) || [];
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("writing/posts/*.md").reverse();

    postsByTitle.clear();
    backlinksCache.clear();

    // Pass 1 — build lookup index by title AND file slug so that both
    // [[Post Title]] and [[file-slug]] forms resolve correctly.
    for (const post of posts) {
      const entry = { url: post.url, title: post.data.title };
      if (post.data.title) {
        postsByTitle.set(post.data.title.toLowerCase(), entry);
      }
      if (post.fileSlug) {
        postsByTitle.set(post.fileSlug.toLowerCase(), entry);
      }
    }

    // Pass 2 — scan raw content for [[links]], build reverse index
    for (const post of posts) {
      const raw = fs.readFileSync(post.inputPath, "utf-8");
      const body = raw.replace(/^---[\s\S]+?---[ \t]*\r?\n/, "");
      const re = /\[\[([^\]]+)\]\]/g;
      let m;
      while ((m = re.exec(body)) !== null) {
        const linked = m[1].trim().toLowerCase();
        const target = postsByTitle.get(linked);
        if (target && target.url !== post.url) {
          const list = backlinksCache.get(target.url) || [];
          if (!list.find(b => b.url === post.url)) {
            list.push({ title: post.data.title, url: post.url });
          }
          backlinksCache.set(target.url, list);
        }
      }
    }

    return posts;
  });

  // Drives /topics/{tag}/ pages via topics/tag.njk pagination.
  eleventyConfig.addCollection("allTags", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("writing/posts/*.md");
    const tagMap = new Map();

    for (const post of posts) {
      const raw = fs.readFileSync(post.inputPath, "utf-8");
      const body = raw.replace(/^---[\s\S]+?---[ \t]*\r?\n/, "");
      // Only match #word when preceded by whitespace or line-start —
      // avoids false positives from URL fragments like (#footnote-1) or page#anchor.
      const re = /(?<!\S)#([A-Za-z0-9_]+)/g;
      let m;
      while ((m = re.exec(body)) !== null) {
        const tag = m[1].toLowerCase();
        const list = tagMap.get(tag) || [];
        if (!list.find(p => p.url === post.url)) list.push(post);
        tagMap.set(tag, list);
      }
    }

    return [...tagMap.entries()].map(([name, tagPosts]) => ({
      name,
      posts: tagPosts.sort((a, b) => new Date(b.date) - new Date(a.date)),
    }));
  });

  eleventyConfig.addFilter("head", (array, n) => array.slice(0, n));

  eleventyConfig.addFilter("postDate", date =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long", year: "numeric", timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("rssDate", date => new Date(date).toUTCString());
  eleventyConfig.addFilter("isoDate", date => new Date(date).toISOString());

  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
  };
};
