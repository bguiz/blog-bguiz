---
title: Javascript quirks, tips, et cetera
date: '2014-08-26T21:42+11:00'
comments: true
tags: [javascript, quirks, snippets]
---

## Slice on array-like objects

[MDN: `Array.prototype.slice` for Array-like objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Array-like)

    function incorrect() {
        return arguments.slice(1); //throws and error
    }

    function error() {
        return Array.prototype.slice(arguments, 1);
    }

The `incorrect` function does *not* work because `arguments` is not an array -
it is an Array-like object.
However, we can still use the `slice` method from `Array`'s prototype.
