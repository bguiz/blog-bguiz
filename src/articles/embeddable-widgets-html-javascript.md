---
title: Creating 3rd-party Embeddable Widgets in HTML and JS
date: '2014-08-11T21:22+11:00'
comments: true
tags: [javascript, html, embed, widget, nodejs]
---

All the social media sites have their own widgets,
from the simple Facebook like button to entire Twitter timelines.

If you have your own platform, how do you go about creating a widget for it?
A widget where you could provide a HTML/ Javascript snippet,
that you could tell third parties to insert into the markup for their own website?

Here is how to create your very own 3rd party embeddable widget!

## The Goal In Mind

We want to end up with two HTTP servers,
one representing your platform,
and the other representing the 3rd party site,
which wishes to embed widgets from your platform on your server.

The point of most widgets is to allow the user to,
interact with your platform,
while staying on the 3rd party website.
For example, if you read a blog post, and it has got a Facebook like button on it,
the user expects that when they click the like button,
the "like" action is added to her timeline on Facebook,
while staying put on the blog post page,
and not have to go to the Facebook website.

In order to demonstrate this,
we will need to create an API on the server;
and test that the user is able to invoke this API
using an embedded widget while remaining on the 3rd party site page.

## Node Up

    mkdir embeddable-widget-demo
    cd embeddable-widget-demo
    npm init
    #initialise your version control here, e.g. git init
    npm install --save express ejs
    mkdir -p views/{client,server}

Now we create the entry point for NodeJs, in `index.js`.
Import the required dependencies,
then create two express instances,
with each of them listening on a different port number.
This is how we simulate the different servers:

- `serverApp` represents your platform
- `clientApp` represents the 3rd party site which wants to embed your platform's widgets


    // index.js
    var http = require('http');
    var express = require('express');
    var os = require( 'os' );
    var ejs = require('ejs');

    var serverPort = process.env.SERVER_PORT || 54100;
    var clientPort = process.env.CLIENT_PORT || 54101;

    var serverApp = express();
    var clientApp = express();

    http.createServer(serverApp).listen(serverPort);
    http.createServer(clientApp).listen(clientPort);

One more thing is missing though.
When this goes beyond a demo,
and your platform gets published,
you will be hosting it on a domain name,
and provide usage documentation for it,
which among other things,
says what the URLs for the widgets are.

Since we do not have that yet,
we work it out at run time based on the IP address.

    var networkInterfaces = os.networkInterfaces( );

    function getIpAddress() {
        var keys = Object.keys(networkInterfaces);
        for (var x = 0; x < keys.length; ++x) {
            var netIf = networkInterfaces[keys[x]];
            for (var y = 0; y < netIf.length; ++ y) {
                var addr = netIf[y];
                if (addr.family === 'IPv4' && !addr.internal) {
                    return addr.address;
                }
            }
        }
        return '127.0.0.1';
    }

    var serverHost = '//'+getIpAddress()+':'+serverPort;
    var platformScript = '/3rd/platform.js';

We can now, at any time, run the server using the command `node index.js`.
Right now, our servers do not do very much at all,
all requests will yield a `HTTP 404` result.

## Creating the Widget

### Page DOM method

#### Serve the main page

We could serve this file using a static file server,
provided we knew the domain ahead of time.
Since this is a demo,
we work this out at run time.
So we need to use a templating engine to render it,
passing in the domain as a template variable.

    clientApp.set('view engine', 'html');
    clientApp.engine('html', ejs.renderFile);
    clientApp.get('/', function(req, res) {
        res.render('client/index', {
            serverHost: serverHost,
            platformScript: platformScript,
        });
    });

Of course, we now have to create the main page to have something to render.

    // views/client/index.html
    <div class="debug">
        serverHost: <%= serverHost %>
    </div>

    <p>Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. </p>
    <div class="foo-widget" data-foo-id="1"></div>

    <p>Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. </p>
    <div class="foo-widget" data-foo-id="2"></div>

    <script src="<%= serverHost %><%= platformScript %>" async></script>

This is, of course, **not** a complete HTML page.
Please add all the additional markup required - `<html>`, `<head>`, `<body>`, et cetera.

### `iframe` method

`//TODO`

## Responding to the Widget

### Enable CORS

The first thing that we need to to do, if using the page DOM method,
is to enable cross origin resource sharing (CORS).

    serverApp.use(function(req, res, next) {
        console.log('cors middleware');
        if ((/^\/api\/3rd\/.+$/).test(req.path)) {
            //TODO if more security is required, perhaps ask each user to login to
            //an admin panel and white list the domains that they would like to embed these widgets on
            //Then test here that the domain matches
            var corsOrigin = req.headers.origin;
            var corsMethod = req.headers['access-control-request-method'];
            var corsHeaders = req.headers['access-control-request-headers'];
            var hasACorsFlag = corsOrigin || corsMethod || corsHeaders;
            if (hasACorsFlag) {
                res.header('Access-Control-Allow-Origin', corsOrigin);
                res.header('Access-Control-Allow-Methods', corsMethod);
                res.header('Access-Control-Allow-Headers', corsHeaders);
                res.header('Access-Control-Max-Age', 60 * 60 * 24);
                if (req.method === 'OPTIONS') {
                    res.send(200);
                    return;
                }
            }
        }
        next();
    });

Disclaimer:
This is not very secure, and you probably should **not** use it in production.
However, it is good enough for a demo!

### Serve the Platform Script File

Once again, we could serve this file using a static file server,
provided we knew the domain ahead of time.
Since this is a demo,
we work this out at run time.
So we need to use a templating engine to render it,
passing in the domain as a template variable.

    serverApp.engine('js', ejs.renderFile);
    serverApp.get(platformScript, function(req, res) {
        res.render('server'+platformScript, {
            serverHost: serverHost,
            platformScript: platformScript,
        });
    });

    // views/server/3rd/platform.js
    'use strict';
    /*globals document, console, XMLHttpRequest*/

    console.log('hello from server');

    (function(global) {
        var serverHost = '<%= serverHost %>';
        var elements = document.querySelectorAll('.foo-widget');
        for (var i = 0; i < elements.length; ++i) {
            var el = elements[i];
            processElement(el);
        }

        function processElement(el) {
            var id = el.getAttribute('data-foo-id');
            var processed = el.getAttribute('data-foo-processed');
            if (!id || processed === 'done') {
                //skip this one as it has either already been processed, or lacks an ID
                //This is done to ensure logic is not executed twice in the event that the
                //user erroneously embeds the script tag more than once on a single page
                console.log('skipping element:', el);
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                el.innerHTML = 'foo-widget: '+this.responseText;
                el.setAttribute('data-foo-processed', 'done');
            };
            xhr.open("GET", serverHost+'/api/3rd/foo-widget/init/'+id);
            xhr.send();
        }
    }());

### Respond to API Requests from Widgets

    serverApp.get('/api/3rd/foo-widget/init/:id', function(req, res) {
        var id = req.params.id;
        res.send('api response #'+id);
    });

## Testing it all together

Run the servers that we just created:

    node index.js

Fire up a browser, and open up the developer tools:
`Ctrl+Shift+C` in both Chrome and Firefox.
Switch to the network tab, so that you are ready to view captured AJAX requests.

Now go to [`http://0.0.0.0:54101/`](http://0.0.0.0:54101/).

This should serve up `index.html` of the 3rd party site.

You should also see a AJAX request made to
[`http://0.0.0.0:54100/`](http://0.0.0.0:54100/)
for each widget that you have on the page in the network tab.

Replace `0.0.0.0` with your IP address, which can be obtained by running
`ifconfig` on *nix and `ipconfig` on Windows.

A snapshot of the work done so far:
[bguiz/embeddable-widget-demo/tree/v0.0.1](https://github.com/bguiz/embeddable-widget-demo/tree/v0.0.1)

## Add more features

So far, we have the ability to embed a snippet of HTML served by the platform server
onto a page served by another (3rd party) server;
using minimal snippets.

That is not all that we need to do though -
we still need to add the ability for these widgets to interact with the
platform server.

We also would like to be able to add styles to the widgets.

Finally, let us make the platform server capable of serving up
widgets for multiple platforms (or namespaces).

### Widgets invoke platform APIs

After `fooWidget.setAttribute('data-foo-processed', 'done');`,
add the following:

    // views/server/3rd/foo/platform.js
    var fooWidgetButton = fooWidget.querySelector('.bar-button');
    if (!fooWidgetButton) {
        return;
    }
    var fooWidgetButtonFunction = function() { /* ... */ };
    if (fooWidgetButton.addEventListener) {
        fooWidgetButton.addEventListener('click', fooWidgetButtonFunction);
    }
    else if (fooWidgetButton.attachEvent) {
        fooWidgetButton.attachEvent('onclick', fooWidgetButtonFunction);
    }
    else {
        fooWidgetButton.onclick = fooWidgetButtonFunction;
    }

Turns out that when using raw Javascript,
without the aid a framework or a library like jQuery,
responding to a simple click event can be quite tricky to do properly!

The implementation of the click handler function would be:

    var fooWidgetButtonFunction = function() {
        //TODO disable the button temporarily to prevent double-click
        var barXhr = new XMLHttpRequest();
        barXhr.onload = function() {
            var result = JSON.parse(this.responseText);
            console.log(result);
            var barPara = fooWidget.querySelector('.bar');
            if (barPara) {
                barPara.innerHTML = JSON.stringify(result);
            }
        };
        barXhr.open('POST', serverHost+'/api/3rd/foo/widget/'+id+'/bar?partyId='+partyId);
        var content = {
            fooId: id,
        };
        content = JSON.stringify(content);
        barXhr.setRequestHeader('Content-type', 'application/json');
        barXhr.send(content);
    };

This sends off another `XMLHttpRequest`,
this time a `POST` with a post body.

We add the following API to accept this `POST` request.
At the moment, it is not much more than a glorified `echo` API -
sufficient for the pruposes of this demo though:

    // index.js
    serverApp.post('/api/3rd/:platform/widget/:id/:action', function(req, res) {
        var id = req.params.id;
        var action = req.params.action;
        var partyId = req.query.partyId;
        var platformWidgetInitPath = platformWidgetInitPathTemplate.replace(':platform', req.params.platform);
        res.send({
            action: req.params.action,
            success: true, //In this demo, all actions succeed
            content: req.body,
        });
    });

Add the following constant to the top of the file.

    // index.js
    var platformWidgetInitPathTemplate = '/3rd/:platform/widget-init.html';

### Adding inline CSS styles to widgets

In the platform Javascript file,
we create a new function that will inject a `style` tag into the DOM
that contains the CSS that we require.

    // server/3rd/genbook/platform.js
    function injectStyles() {
        var css = '<%= inlineCss %>';
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        var head = document.head || document.querySelector('head');
        head.appendChild(style);
    }

Of course, it would be crazy to write the CSS right here,
in a Javascript string literal,
so we shall defer that to the templating engine and the platform server.

    // index.js
    serverApp.get(platformScriptPathTemplate, function(req, res) {
        var partyId = req.query.partyId;
        var platformScriptPath = platformScriptPathTemplate.replace(':platform', req.params.platform);
        var platformStylePath = platformStylePathTemplate.replace(':platform', req.params.platform);
        //TODO inserting the CSS file into the platform script like this is quite wasteful
        //This is a prime candidate for refactoring or at the very least result caching
        fs.readFile(path.normalize(platformStylePath), function(err, data) {
            data = ((!err && data && data.toString()) || '').replace( /(?:\r\n|\r|\n)/g , ' ');
            res.render('server'+platformScriptPath, {
                partyId: partyId,
                serverHost: serverHost,
                platformScript: platformScriptPath,
                inlineCss: data,
            });
        });
    });

Here, we modify the platform server route which serves the platform Javascript
to read the platform CSS file, strip it off new line chaarcters,
and then pass it to the templating engine.

This is a little hacky, and only fit for demonstration puposes.
Things to do would include:

- Minify the CSS
- Escape other special characters
- Cache the CSS response



    // index.js
    var platformScriptPathTemplate = '/3rd/:platform/platform.js';
    var platformStylePathTemplate = __dirname+'/views/server/3rd/:platform/platform.css';

These constants should also be added to the top of the file.

### Refactor to serve multiple widget platforms

We have already done this in the previous steps!

By declaring the constants named `somethingTemplate`,
and then replacing the `:platform` part of it with the `:platform`
that we extract from the request path;
we can now create many platforms by simply adding
a new folder with the same name as the platform.

## Testing interactions between the embedded widgets and platform server

A snapshot of the work so far:
[bguiz/embeddable-widget-demo/tree/v0.0.2](https://github.com/bguiz/embeddable-widget-demo/tree/v0.0.2)

... or see the complete set of changes since the first iteration:
[bguiz/embeddable-widget-demo/compare/v0.0.1...v0.0.2](https://github.com/bguiz/embeddable-widget-demo/compare/v0.0.1...v0.0.2)

Run `node index.js`, and click the buttons in each widget.
The widget should update to contain a JSON string,
which is the response from the server.

## Adding support for `iframe`s

Not all widgets need to be added using `iframe`s,
as manipulating the DOM on the page on which the widget was embeed is often sufficient.
However, when security is a big concern,
`iframe`s are slightly better,
as you no longer need to enable CORS.

Note however that it is not a silver bullet,
and that [neither are very secure](http://stackoverflow.com/a/25260056/194982).

### Disable CORS

Firstly, determine whether we wish to use `iframe`s -
let us use them by default:

    // index.js
    var defaults = {
        EMBED_TYPE: 'iframe',
        //...
    };
    //NOTE Set EMBED_TYPE to "iframe" or "dom"
    var useIframe = (process.env.EMBED_TYPE || defaults.EMBED_TYPE) === 'iframe';

In the same file, we enables CORS through our own middleware:

    //enable CORS
    serverApp.use(function(req, res, next) { /* ... */ });

Change this, such that the middleware only gets added when `useIframe` is true.

    //enable CORS - only if not using iframes
    if (!useIframe) {
        serverApp.use(function(req, res, next) { /* ... */ });
    }

We also pass the `useIframe` flag into the `render` statement
when serving the platform script:

    res.render('server'+platformScriptPath, {
        partyId: partyId,
        serverHost: serverHost,
        platformScript: platformScriptPath,
        inlineCss: data,
        useIframe: useIframe,
    });

### Platform script inserts `iframe` instead

Capture the `useIframe` variable in a template:

    // views/server/3rd/foo/platform.js
    var useIframe = <%= useIframe %>;

In the `processFooWidget` function,
split the existing logic that deals with initialising the widget
into a new function, called `createFooWidget`.

In this function, use templating to create two different render paths,
depending on whether `useIframe` is true or false.

    function createFooWidget(fooWidget, id) {
        <% if (useIframe) { %>
            /* ... */
        <% } else { %>
            var xhr = new XMLHttpRequest();
            /* (existing same-page DOM code) */
        <% } %>
    }

In the render path for when `useIframe` is true,
we create the `iframe` as a DOM element,
and simply set its source to the widget HTML.

When we do, the URL that the widget HTML is slightly modified,
to include an extra query parameter, `iframe=true`.

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', serverHost+'/api/3rd/foo/widget/'+id+'/init?iframe=true&partyId='+partyId);
    iframe.setAttribute('class', 'foo-widget-iframe');
    iframe.setAttribute('data-foo-id', id);
    iframe.setAttribute('width', '200px');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.border = 'none';
    iframe.style.height = '200px';
    iframe.style.width = '200px';
    iframe.style.position = 'relative';
    iframe.style.overflow = 'hidden';
    fooWidget.appendChild(iframe);
    fooWidget.setAttribute('data-foo-processed', 'done');

### Move platform logic from platform to widget HTML

In the widget HTML, when `useIframe` is true,
we now render a `script` tag.
The contents of this `script` tag will be almost identical to the code within
`xhr.onload`:

- Setting `data-foo-processed` has already been done by the platform script.
- Instead of setting `innerHTML`, we do not do anything - the `iframe` takes care of that for us!
- Instead of using `fooWidget`, we use the `iframe`'s content itself, which is referred to as `document`



    // views/server/3rd/foo/widget-init.html
    <% if (isIframe) { %>
    <script>
        var serverHost = '<%= serverHost %>';
        var id = '<%= id %>';
        var partyId = '<%= partyId %>';
        var fooWidget = fooWidget;
        var fooWidgetButton = fooWidget.querySelector('.bar-button');
        /* (similar to the code within `xhr.onload`) */
    </script>
    <% } %>

The main intent here is to move this logic from the platform script,
which is run by the page that embeds the widget,
to this script within the widget HTML,
which is run by a page from your own platform server within an `iframe`.

We do this in order for the widget to invoke the platform APIs
without performing a cross-domain request.

## Testing the `iframe` widgets

A snapshot of the work so far:
[bguiz/embeddable-widget-demo/tree/v0.0.3](https://github.com/bguiz/embeddable-widget-demo/tree/v0.0.3)

... or see the complete set of changes since the second iteration:
[bguiz/embeddable-widget-demo/compare/v0.0.2...v0.0.3](https://github.com/bguiz/embeddable-widget-demo/compare/v0.0.2...v0.0.3)

- Run `node index.js`, and the widgets should load within an `iframe`.
- Run `EMBED_TYPE=dom node index.js`, and the widgets should load within the page DOM

Of course, check that the server interactions continue to work,
in both the `iframe` version and the same-page DOM version.

Note that in production, you most likely will not need to support both methods
simultaneously, as we do here.
If this is the case, then most of the conditional logic that we have here
can be discarded, using just one or the other,
thereby reducing the load on the server when rendering these.

## Some Pointers

### Do not forget to document things for the 3rd parties

Third parties want to be able to embed your widgets,
but they need to know exactly how to do so.

Where possible make changes to the design of your widget to minimise
the amount of effort required on behalf of the 3rd party.
In this demo widget that we have built here,
I have tried to cut it down to the bare minimum:
the 3rd party site needs to copy the script tag once per page,
and the each of the `div`s where they want them to appear.

### Expect, and prepare, for 3rd parties to use widgets in unexpected ways

One common way this will manifest itself is if you have instructions to
copy the script tag once per page only.
Some 3rd party sites will, inevitably, copy the script tag multiple times per page,
perhaps once per widget, because they misunderstood the instructions.

Plan for robustness.
Try doing precisely this, and refresh your page,
and you should see the `skipping element` being output to screen.
Be sure to build in robustness like this into the scripts driving your widgets.

Think of other situations in which the embed instructions could potentially be misused,
and plan contingency plans for each of them -
usually these would involve either ignoring or filtering.

For example, one more situation, which we have also taken into account in this demo widget,
is that 3rd party sites often are CMSes.
While some do allow Javascript,
many CMSes do not, and only allow HTML.
For this reason,
the configuration for the script and widgets are stored entirely in HTML data attributes,
instead of a config Javascript literal.

## Source Code

If you would like to see the end result,
to see how it all fits together,
or just to give it a try,
you can find the
[accompanying source code for this here](http://blog.bguiz.com/articles/embeddable-widgets-html-javascript/).

## Work in progress

- Page DOM vs. insert an `iframe`: [Question on Stackoverflow](http://stackoverflow.com/q/25236746/194982)
    - Include examples for both direct DOM manipulation and `iframe` methods
- One AJAX request per widget API is horribly wasteful, especially when you expect many of them to be on the same page. Consider coalescing the requests into one.
- The page and widget are pretty bare bones at the moment, make them look nicer by adding some styles
- Raw XHR - perhaps load jQuery or use some other library instead?
    - This will complicate the widget by needing to support loading dependencies without polluting the 3rd party site
