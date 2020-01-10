const slugForStaticmanFilter = require('./slug-for-staticman-filter.js');

module.exports = function staticmanCollectionFilter (comments, page) {
  const slug = slugForStaticmanFilter(page);

  const filteredComments = comments.filter((item) => {
    const match = item.inputPath.indexOf(`/${slug}/`) > 0;
    return match;
  }).map((item) => {
    return {
      name: item.data.name,
      message: item.data.message,
      date: item.data.date,
      hash: item.data.email,
      body: item.templateContent,
    };
  }).sort((itemA, itemB) => {
    return itemB.date > itemA.date;
  });

  return filteredComments;
};
