const camelCase = require('camelcase');

module.exports = function hashTagifyFilter (tags) {
  if (!Array.isArray(tags) || tags.length < 1) {
    return '';
  }
  const hashTags = tags.map(
    (tag) => (`#${camelCase(tag)}`)
  ).join(' ');
  return hashTags;
};
