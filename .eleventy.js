const fs = require('fs');

const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const customPermalinkFilter = require('./src/filters/custom-permalink-filter.js');
const hashTagifyFilter = require('./src/filters/hash-tagify-filter.js');
const slugForStaticmanFilter = require('./src/filters/slug-for-staticman-filter.js');
const staticmanCollectionFilter = require('./src/filters/staticman-collection-filter.js');
const urlAbsoluteOrRelativeFilter = require('./src/filters/url-absolute-or-relative-filter.js');

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

module.exports = function(config) {
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('customPermalink', customPermalinkFilter);
  config.addFilter('hashTagify', hashTagifyFilter);
  config.addFilter('slugForStaticman', slugForStaticmanFilter);
  config.addFilter('staticmanCollection', staticmanCollectionFilter);
  config.addFilter('urlAbsoluteOrRelative', urlAbsoluteOrRelativeFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');

  // Transforms
  config.addTransform('htmlmin', htmlMinTransform);
  config.addTransform('parse', parseTransform);

  // Passthrough copy
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/admin/config.yml');
  config.addPassthroughCopy('src/admin/previews.js');
  config.addPassthroughCopy('src/search/*.js');
  config.addPassthroughCopy('src/presentations/**/*.md');
  config.addPassthroughCopy('src/articles/**/*.jpeg');
  config.addPassthroughCopy('src/articles/**/*.jpg');
  config.addPassthroughCopy('src/articles/**/*.png');
  config.addPassthroughCopy('src/articles/**/*.gif');
  config.addPassthroughCopy('src/articles/**/*.svg');
  config.addPassthroughCopy('src/presentations/**/*.jpeg');
  config.addPassthroughCopy('src/presentations/**/*.jpg');
  config.addPassthroughCopy('src/presentations/**/*.png');
  config.addPassthroughCopy('src/presentations/**/*.gif');
  config.addPassthroughCopy('src/presentations/**/*.svg');
  config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');
  config.addPassthroughCopy({
      'static/3rd-party': '3rd-party',
  });
  config.addPassthroughCopy({
    'node_modules/reveal.js/js': '3rd-party/revealjs/js',
  });
  config.addPassthroughCopy({
    'node_modules/reveal.js/css': '3rd-party/revealjs/css',
  });
  config.addPassthroughCopy({
    'node_modules/reveal.js/img': '3rd-party/revealjs/img',
  });
  config.addPassthroughCopy({
    'node_modules/reveal.js/lib': '3rd-party/revealjs/lib',
  });
  config.addPassthroughCopy({
    'node_modules/reveal.js/plugin': '3rd-party/revealjs/plugin',
  });

  const now = new Date();

  // Custom collections
  const livePosts = post => (post.date <= now && !post.data.draft);

  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  config.addCollection('articles', collection => {
    return [
      ...collection.getFilteredByGlob('./src/articles/**/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('presentations', collection => {
    return [
      ...collection.getFilteredByGlob('./src/presentations/**/*.html').filter(livePosts)
    ].reverse();
  });

  config.addCollection('books', collection => {
    return [
      ...collection.getFilteredByGlob('./src/books/**/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('comments', collection => {
    return [
      ...collection.getFilteredByGlob('./src/staticman-comments/**/*.md')
    ];
  });

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);

  // Ref: https://www.11ty.dev/docs/data-deep-merge/
  // Ref: https://github.com/11ty/eleventy-upgrade-help/tree/v1.x#data-deep-merge
  config.setDataDeepMerge(true);

  // Ref: https://github.com/11ty/eleventy/issues/1390
  // Ref: https://github.com/11ty/eleventy-upgrade-help/tree/v1.x#liquid-options
  config.setLiquidOptions({
    strictFilters: true,
    dynamicPartials: true,
  });

  // dev server
  // Ref: https://www.11ty.dev/docs/dev-server/
  config.setServerOptions({
    showAllHosts: false,
    showVersion: true,
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
