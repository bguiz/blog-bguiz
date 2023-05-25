module.exports = function urlAbsoluteOrRelativeFilter(url, baseUrl) {
    // regexr.com/7ec9p
    if ((/^(http(s)?:\/\/.).*/i).test(url)) {
        return url;
    } else {
        return (new URL(url, baseUrl)).href;
    }
};
