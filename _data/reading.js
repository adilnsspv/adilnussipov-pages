const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Month name/abbreviation → 1-12, case-insensitive (e.g. "March", "mar").
const MONTH_INDEX = {};
MONTHS.forEach((name, i) => {
  MONTH_INDEX[name.toLowerCase()] = i + 1;
  MONTH_INDEX[name.slice(0, 3).toLowerCase()] = i + 1;
});

// Parse a book's `finished` value into { year, month, label, sortKey }.
// Forgiving on format — any of these work:
//   "March 2022"  "Mar 2022"  "2022-03"  "2022"
// year is required (for grouping); month is optional.
function parseFinished(book) {
  const raw = String(book.finished ?? book.year ?? "").trim();
  let year = null, month = null, m;

  if ((m = raw.match(/^(\d{4})-(\d{1,2})$/))) {
    year = +m[1]; month = +m[2];
  } else if ((m = raw.match(/^([A-Za-z]+)\s+(\d{4})$/))) {
    year = +m[2]; month = MONTH_INDEX[m[1].toLowerCase()] || null;
  } else if ((m = raw.match(/^(\d{4})$/))) {
    year = +m[1];
  }

  const monthName = month && MONTHS[month - 1] ? MONTHS[month - 1] : "";
  const label = monthName ? `${monthName} ${year}` : year ? String(year) : "";
  // Higher = more recent, so books within a year sort newest-first.
  const sortKey = year ? year * 100 + (month || 0) : 0;
  return { year, month, label, sortKey };
}

// --- Cover auto-resolution -------------------------------------------------
// So the YAML only ever needs title + author + finished: for any book without
// an explicit cover, we search Open Library by title + author and keep the best
// match's cover id / ISBN. Results are cached in books/cover-cache.json so we
// only hit the network for books we haven't seen, and builds stay fast/offline.
// Delete a book's entry from that file (or clear it) to force a re-lookup.

const CACHE_FILE = path.join(__dirname, "..", "books", "cover-cache.json");

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  const sorted = Object.fromEntries(Object.entries(cache).sort());
  fs.writeFileSync(CACHE_FILE, JSON.stringify(sorted, null, 2) + "\n");
}

const cacheKey = book =>
  `${book.title} — ${book.author}`.toLowerCase().replace(/\s+/g, " ").trim();

// Query Open Library for one title/author pair. Returns { coverId } | { isbn }
// on a hit, {} for a valid "no match" response, or null on network error.
async function queryOpenLibrary(title, author) {
  const params = new URLSearchParams({
    title,
    author,
    limit: "1",
    fields: "cover_i,isbn",
  });
  const url = `https://openlibrary.org/search.json?${params}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "adilnussipov.com reading log (cover lookup)" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const doc = (await res.json()).docs?.[0];
    if (!doc) return {};
    if (doc.cover_i) return { coverId: doc.cover_i };
    if (doc.isbn?.length) return { isbn: doc.isbn[0] };
    return {};
  } catch (e) {
    console.warn(`[reading] Cover lookup failed for "${title}": ${e.message}`);
    return null;
  }
}

// Resolve a cover for a book. Tries the full title first, then the main title
// without its subtitle (the part before a colon), since long subtitles often
// miss on Open Library. Returns { coverId } | { isbn } | {} | null (null on a
// network error, so the caller doesn't cache a temporary miss).
async function fetchCover(book) {
  const mainTitle = book.title.split(":")[0].trim();
  const titles = mainTitle !== book.title ? [book.title, mainTitle] : [book.title];

  let sawResponse = false;
  for (const title of titles) {
    const result = await queryOpenLibrary(title, book.author);
    if (result === null) continue;           // network error — try the next variant
    sawResponse = true;
    if (result.coverId || result.isbn) return result;
  }
  return sawResponse ? {} : null;             // {} = genuine no-match; null = all requests failed
}

// Fill in a book's cover from cache or the network. Manual cover/coverId/isbn
// in the YAML always wins and skips the lookup entirely.
async function resolveCover(book, cache) {
  if (book.cover || book.coverId || book.isbn) return false;

  const key = cacheKey(book);
  if (key in cache) {
    Object.assign(book, cache[key]);
    return false;
  }

  const result = await fetchCover(book);
  if (result === null) return false; // network error — don't poison the cache
  cache[key] = result;
  Object.assign(book, result);
  return true; // cache changed → caller persists it
}

// Single source of truth for the reading log: books/books.yaml, one block per
// book (see that file's header for the format). YAML is used instead of JSON so
// it's forgiving to hand-edit — no trailing-comma or stray-quote traps that
// would break the whole build. Each block needs { title, author, finished };
// the cover is looked up automatically. Books are grouped by year (derived from
// `finished`) and years returned newest-first; within a year, books are ordered
// newest-finished first.
module.exports = async () => {
  const file = path.join(__dirname, "..", "books", "books.yaml");
  if (!fs.existsSync(file)) return [];

  const books = yaml.load(fs.readFileSync(file, "utf-8")) || [];

  // Resolve every book's cover (cache hits are instant; misses hit the network
  // in parallel), then persist the cache once if anything new was fetched.
  const cache = loadCache();
  const changes = await Promise.all(books.map(b => resolveCover(b, cache)));
  if (changes.some(Boolean)) saveCache(cache);

  const byYear = new Map();
  for (const book of books) {
    const finished = parseFinished(book);
    if (finished.year == null) {
      console.warn(`[reading] Skipping book with no valid "finished" year: "${book.title}"`);
      continue;
    }
    // Expose the display label + sort key to the templates.
    book.finishedLabel = finished.label;
    book._sortKey = finished.sortKey;
    if (!byYear.has(finished.year)) byYear.set(finished.year, []);
    byYear.get(finished.year).push(book);
  }

  return [...byYear.entries()]
    .map(([year, yearBooks]) => ({
      year,
      books: yearBooks.sort((a, b) => b._sortKey - a._sortKey),
    }))
    .sort((a, b) => b.year - a.year);
};
