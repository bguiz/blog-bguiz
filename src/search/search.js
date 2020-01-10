document.addEventListener("DOMContentLoaded", function() {
  initSearch();
});

function initSearch() {
  const searchInput =
    document.getElementById('search-input');
  const resultsContainer =
    document.getElementById('search-results-container');

  getJson('/search/search.json', function (err, json) {
    if (err) {
      console.error(err);
    } else {
      const sjs = SimpleJekyllSearch({
        searchInput,
        resultsContainer,
        json,
      });
      searchByQueryParam(searchInput, sjs);
    }
  });
}

function searchByQueryParam (searchInput, sjs) {
  try {
    // if quick search has been used, use query parameters in URL to
    // perform search immediately
    const queryParams = (new URL(document.location)).searchParams;
    const q = queryParams.get('q');
    if (typeof q !== 'undefined') {
      searchInput.value = q;
      setTimeout(function () {
        sjs.search(q);
      }, 0);
    }
  } catch (ex) {
    // do nothing
  }
}

function getJson(url, errback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      try {
        var data = JSON.parse(this.response);
        errback(undefined, data);
      } catch (e) {
        errback(e);
      }
    } else {
      errback(this.response);
    }
  };

  request.onerror = function(err) {
    errback(err);
  };

  request.send();
}
