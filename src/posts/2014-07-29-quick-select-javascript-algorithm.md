---
title: Quick Select Algorithm, a Javascript Implementation
date: '2014-07-29T22:54+11:00'
comments: true
tags: [javascript, algorithm]
---

The function description comment says it all.

    /*
     * Places the `k` smallest elements (by `propName`) in `arr` in the first `k` indices: `[0..k-1]`
     * Modifies the passed in array *in place*
     * Returns a slice of the wanted eleemnts for convenience
     * Efficient mainly because it never performs a full sort.
     *
     * The only guarantees are that:
     *
     * - The `k`th element is in its final sort index (if the array were to be sorted)
     * - All elements before index `k` are smaller than the `k`th element
     *
     * [Reference](http://en.wikipedia.org/wiki/Quickselect)
     */
    function quickSelectInPlace(arr, k, propName) {
        if (!arr || arr.length <= k || typeof propName !== 'string') {
            throw 'Invalid arguments to quickSelectInPlace';
        }
        var len = arr.length;

        var from = 0;
        var to = len - 1;
        while (from < to) {
            var left = from;
            var right = to;
            var pivot = arr[Math.ceil((left + right) * 0.5)][propName];

            while (left < right) {
                if (arr[left][propName] >= pivot) {
                    var tmp = arr[left];
                    arr[left] = arr[right];
                    arr[right] = tmp;
                    --right;
                }
                else {
                    ++left;
                }
            }

            if (arr[left][propName] > pivot) {
                --left;
            }

            if (k <= left) {
                to = left;
            }
            else {
                from = left + 1;
            }
        }
        return arr.slice(0, k);
    }
