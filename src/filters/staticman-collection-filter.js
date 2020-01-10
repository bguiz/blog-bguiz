const slugForStaticmanFilter = require('./slug-for-staticman-filter.js');

module.exports = function staticmanCollectionFilter (comments, page) {
  const slug = slugForStaticmanFilter(page);
  console.log('slug', slug);
  console.log('comments', comments);

  return comments.filter((item) => {
    console.log(slug, item);
    return true;
  });
};
