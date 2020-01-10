const { DateTime } = require('luxon');

const dtBorderA = DateTime.fromISO('2014-07-07');
const dtBorderB = DateTime.fromISO('2016-04-17');
const dtBorderC = DateTime.fromISO('2020-01-01');

module.exports = function customPermalinkFilter (page) {
  const dt = DateTime.fromJSDate(page.date);
  let permalink;
  if (page.overrideUrl) {
    permalink = page.overrideUrl
  } else if (dt.valueOf() > dtBorderC.valueOf()) {
    permalink = `/${ dt.toFormat('yyyy') }/${ page.fileSlug}`;
  } else if (dt.valueOf() > dtBorderB.valueOf()) {
    let regexMatch = page.fileSlug.match(/^(\d\d\d\d)-(\d\d)-(.*)$/);
    permalink = `/${ regexMatch[1] }/${ regexMatch[3]}`;
  } else if (dt.valueOf() > dtBorderA.valueOf()) {
    permalink = `/${ dt.toFormat('yyyy/MM/dd') }/${ page.fileSlug}`;
  } else {
    permalink = `/${ dt.toFormat('yyyy') }/${ page.fileSlug}`;
  }
  if (permalink[permalink.length - 1] != '/') {
    permalink = `${permalink}/`;
  }
  return permalink;
};
