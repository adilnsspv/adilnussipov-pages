module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("writing/posts/*.md").reverse();
  });

  eleventyConfig.addFilter("head", function(array, n) {
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("postDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("rssDate", function(date) {
    return new Date(date).toUTCString();
  });

  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString();
  });

  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
