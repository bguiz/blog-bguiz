const markdownItLib = require('../utils/markdownit.js')

module.exports = function markdown(value) {
  return markdownItLib.render(value);
};
