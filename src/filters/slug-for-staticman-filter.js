module.exports = function slugForStaticmanFilter (page) {
  return page.url
    .replace(/\/+$/, '')
    .replace(/^\/+/, '')
    .replace(/\/+/, '--');
};
