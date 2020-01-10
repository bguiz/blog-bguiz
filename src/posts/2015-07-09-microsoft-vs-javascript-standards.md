---
title: Microsoft vs Javascript standards
date: '2015-07-09T12:38+11:00'
comments: true
tags: [windows, rant, javascript, standards]
---

`<rant>`

Microsoft's flagship browser has been causing web developers much anguish
for over a decade now,
and they appear to have unleashed an "improved" version of that mediocrity
upon us via WinJS in their offering for HTML apps for Windows.

In Javascript norms, when a function throws an error,
the error and its stack trace get output to the console,
all functions on this stack get aborted,
and execution of other parts of the page resume.
**Even IE** gets this right.
Microsoft has, however, decided to "improve" upon this behaviour
in their WinJS run time, where they decide that in the above scenario,
what should happen instead is to simply crash the program,
in a manner similar to that of a `SEGFAULT` in a C program.

This is most likely the root cause of the plentiful random crashes
in an app that we have been working on.

Even if we wrote our own code in defensively to work around this limitation
by *wrapping everything* in a *`try-catch` block*,
we simply **cannot enforce that the 3rd-party libraries**
we include do so as well.

... But there is *light at the end of the tunnel*.
After much sleuthing, [Chris](https://github.com/impaler)
and I have worked out that there is indeed a way to catch these errors:
by setting a `window.onerror` handler function,
and doing `evt.preventDefault()` inside it.

But that would be too easy, wouldn't it?
Why yes, of course, we should have had the foresight to realise that
the **spec would be ignored yet again**,
and be required to use a parallel API instead.
Here's the workaround that we ended up with that appears to work:

```
window.WinJS.Application.addEventListener('error', globalOnError);
function globalOnError(evt) {
  console.log('globalOnError', evt); // Replace with proper logging functions
  return true;
}
```

In a 3rd instance of a **flagrant disregard for Javascript norms**,
the `evt` parameter here has neither
`preventDefault()` nor `stopPropagation()` methods available.
On the other hand, `evt.details.error` does,
but that does not matter,
because calling those will crash the program `SEGFAULT` style as well -
but of course!
Instead, we have to do a `return true` to do so,
which takes us all the way back to Javascript event handling patterns
that fell out of favour in the 90's.

`</rant>`

We may have found a workaround for (at least some of) the random crashes,
and in doing so, found this caution to be vital:
When doing anything Microsoft Javascript platforms,
tread carefully, and be prepared to write a parallel set of code
from specification compliant Javascript.
**Do not expect** anything that *"should work"*
because *"it's standard Javascript"* to actually work,
because that does not appear to be a priority.

Javascript is a language that is supposed to be both
**community-driven** (ECMAScript and W3C) and **open**;
and vendor should be creating platforms that go forward
with the standards as they progress forward rather than break them
with works-for-me-only solutions.

Please **reconsider** your Javascript strategy.
