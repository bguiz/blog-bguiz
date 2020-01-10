---
title: Perspectives of a Javascript Developer of Windows 10 UWP
date: '2016-02-23T20:32+11:00'
comments: true
tags: [windows, javascript, offline, cordova, conference]
---

Not a Windows or a .NET developer of any flavour,
but I have been using Javascript to write applications that work on
devices running windows.

I have been packaging them up using Cordova/ Phonegap.
This works well for Android and iOS,
but not so well for Windows;
but thankfully Microsoft has released a
*HTML + JS* offering which it calls *WinJS*,
and is essentially a tool chain which does what Cordova/ Phonegap do,
from Visual Studio, building Windows 10 UWP apps.
(There are also Windows 8 UWPs, but I won't go into that here.)

## Windows 10 Workshop

Attended a full-day workshop by
Andrew Wigley from *Microsoft* and
Nick from *Built to Roam*.

The workshop day consisted of multiple *hands-on labs*.
The workshops are available from
[this Github Repository](https://github.com/Windows-Readiness/WinDevHOLs),
and they include the completed source code,
but more importantly PDF files with step by step instructions
on how to create the applications from scratch,
with screen shots along the way.
These were extremely helpful, and very high quality -
I have yet to attend any workshop where the materials prepared were this great!

## WinJS

All of the labs were focused on developing using .NET (*XAML + C#*),
with the exception of one,
which covers WinJS (*HTML + JS*),
which is precisely the technology that I have been using.
This lab, was by far the most useful one I have attended,
as it gave me one great idea to take away.

There is a tool called manifest which Microsoft has published on
[npm](http://npmjs.com).
Point it at your own website,
and it will analyse it,
and generate a Visual Studio solution from it.
This is essentially is a shell or wrapper around the website.
You can then use standard Javascript feature detection techniques, e.g.:

```javascript
if (window.WinJS) {
  // access Windows APIs
}
```

in your main website in order to access device-specific APIs
from within your wrapped app.
(all within the confines of a standard security sandbox model, of course)

A lot of bang, for very little buck!
Of course, this is *too good to be true*,
because a mobile app that requires constant Internet connectivity is...
well not a very good mobile app at all!

## Offline First

I sat on this for a while,
letting the thought percolate in the background;
and I recalled the concept of offline-first web applications:
Here's a [primer on offline-first](http://offlinefirst.org/).

The basic idea is that
when the user loads a page for the first time,
the page is stored in your browser's regular ol' cache.
The browser uses offline storage capabilities -
[`localStorage`/ IndexedDb/ WebSql](https://github.com/mozilla/localForage) -
to store information,
and [Service Worker APIs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
as a fall back for when actual HTTP endpoints are not reachable.

That is quite exciting because it means that instead of
maintaining a separate code base for a packaged app,
we need just the one.
An added benefit would be a much snappier regular web site.

... but there is a catch,
for Windows 10 UWP that is,
because it runs the same technology under the hood as
the Edge browser, and it turns out that
[Edge doesn't support Service Worker APIs](http://caniuse.com/#feat=serviceworkers).

Hope it lands soon!

## So Windows 10?

The Javascript tool chain has a way to go yet -
Despite starting out with Windows 10,
and Visual Studio 2015 *already installed*,
there was a constant stream of miscellaneous updates
that needed to be installed for the next thing to work.
Each of these updates weighed in at over a Gigabyte,
and between ten and thirty minutes of "applying changes" time
(in addition to the download time).
I would estimate I spent about half the time at the workshop
just installing stuff, rather than following along and writing code.

If you are used to working with the `npm` ecosystem,
such a *high barrier to entry* just seems absurd.

One of the presenters said that you have to get "all your stars to align"
before some particular feature (Cortana, I recall) works.
IMHO, that is true in general about Microsoft's Javascript tool chain.

That being said, it is still early days,
and I hope they improve the developer experience.
It is worth giving it a go, and
[this guide](https://github.com/Windows-Readiness/WinDevHOLs/tree/master/04.%20Edge%20and%20Web%20Apps "Edge and Web Apps")
is a great place to start.
