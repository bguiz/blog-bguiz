const slugForStaticmanFilter = require('./slug-for-staticman-filter.js');

module.exports = function staticmanCollectionFilter (comments, page) {
  const slug = slugForStaticmanFilter(page);

  const filteredComments = comments.filter((item) => {
    const match = item.inputPath.indexOf(`/${slug}/`) > 0;
    if (slug === '2017--json-merge-postgresql') {
      console.log(page.url);
      console.log(item.inputPath);
      console.log(`/${slug}/`);
      console.log('match', match);
    }
    return match;
  }).map((item) => {
    return {
      name: item.data.name,
      message: item.data.message,
      date: item.data.date,
      body: item.templateContent,
    };
  });

  if (slug === '2017--json-merge-postgresql') {
    console.log(filteredComments.length);
    console.log(filteredComments);
  }
  return filteredComments;
};
