const markdownIt = require('markdown-it');
const markdownItFootnotePlugin = require('markdown-it-footnote');

const markdownItLib = markdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: true,
})
  .use(markdownItFootnotePlugin);

module.exports = markdownItLib;
