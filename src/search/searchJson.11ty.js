class SearchJson {
  data() {
    return {
      permalink: '/search/search.json',
    };
  }

  render(data) {
    const { collections } = data;
    const { posts, articles, presentations, books } = collections;
    const searchValues = [
      ...(posts.map(processItemWithCategory('post'))),
      ...(articles.map(processItemWithCategory('article'))),
      ...(presentations.map(processItemWithCategory('presentation'))),
      ...(books.map(processItemWithCategory('book'))),
    ];
    return JSON.stringify(searchValues, undefined, 1);
  }
}

function processItem(item) {
  const {
    url,
    data: {
      title = '',
      date = '',
      description = '',
      tags = [],
    },
  } = item;
  let desc = description;
  if (!desc) {
    // TODO let description fall back to first x words in content
    desc = '';
  }
  let tagString;
  if (Array.isArray(tags) && tags.length > 0) {
    tagString = tags.join(', ');
  } else {
    tagString = '';
  }
  return {
    url,
    date,
    title,
    desc,
    tags: tagString,
  };
}

function processItemWithCategory(category) {
  return function processItemWithCategoryCurried(item) {
    const processedItem = processItem(item);
    return {
      ...processedItem,
      category,
    };
  }
}

module.exports = SearchJson;
