const camelCase = require('camelcase');

module.exports = function slugForStaticmanFilter (page) {
  return page.url.slice(1).replace('/', '--');
};
