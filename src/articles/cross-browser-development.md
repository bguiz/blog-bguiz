---
title: Cross Browser Web Development
date: '2014-11-02T09:02+11:00'
comments: true
tags: [crossbrowser, html, javascript, css]
---

When Sun first released Java, its tagline was "write once, run everywhere."
Many developers soon dubbed that, rewording it as "write once, debug everywhere."

The same can be said for web development.
While it is true that the HTML, CSS, and Javascript trio is the only set of front-end technologies that work on all platforms and devices,
it does so with a rather generous serving of quirks.
Cross browser web development is *hard*.

This article aims to provide an overview of the various techniques used
to ensure that a web page displays and behaves the same in different browsers and devices;
and provide links to resources that would constitute
a comprehensive knowledge base on the topic.

## Techniques

- Best practices
    - Before commencing a project, clarify exactly which browsers and versions you need to support
        - For the very bold, you can get creative with ways to [make your users switch to newer browsers](http://www.kogan.com/au/blog/new-internet-explorer-7-tax/)
    - Avoid CSS hacks, and `!important`
    - Avoid browser detection, and use feature detection instead. Modernizr and yepnope.js are great for this.
- Standards
    - Read the specs (or articles that summarise them), and adhere to the standards imposed by them
- Libraries
    - Use a library such as jQuery or Modernizr that have already have cross browser polyfills and shims
- Resets
    - Using a CSS reset ensures a common baseline across all browsers
- Matching vs progressive enhancement
    - Rather than trying to make the display and beahviours match, allow them to be different, with a reasonable baseline
- Testing
    - Use browsershots to eyeball how the page displays in many different browsers at once
- Transpilers
    - Use SASS/ LESS/ Stylus or another CSS preprocessor that automatically creates vendor-specific prefixes for style rules
    - Many ES6/ES5 to ES3 transpilers include shims or polyfills for language features that are not supported in older browsers, or behave slightly different in various modern browsers

### Notes

- Use Modernizr when you want a library that provides both feature detection and polyfills. Use yepnope.js when you only want feature detection, and you wish to bring your own polyfill.
- Feature detection works by testing for the type and existence of various properties on `window`, `document`, or DOM elements created on the fly (and sometimes other techniques too).
- Polyfills work by first doing feature detection, and if a feature is missing natively, implementing it using Javascript

## Resources

- Articles
    - [The Developer’s Guide To Writing Cross-Browser JavaScript Polyfills](http://addyosmani.com/blog/writing-polyfills/) - by Addy Osmani
    - [Cross Browser Development Standards & Interoperability Best Practices](https://www.modern.ie/en-us/category/code-with-standards) - by Dave Methvin & Rey Bango
    - [What are the best practices for cross-browser web sites?](http://stackoverflow.com/questions/1064594/what-are-the-best-practices-for-cross-browser-web-sites) - Stackoverflow community wiki
    - [What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)
    - [Understanding Progressive Enhancement](http://alistapart.com/article/understandingprogressiveenhancement)
- References
    - [Mozilla Developer Network](https://developer.mozilla.org/)
    - [Can I Use?](http://caniuse.com/)
    - [Quirksmode](http://quirksmode.org/)
- Tools
    - [Modernizr](http://modernizr.com/)
    - [yepnope.js](http://yepnopejs.com/)
    - [Browsershots](http://browsershots.org/)
    - [CSS resets](http://www.cssreset.com/)
