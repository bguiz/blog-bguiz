---
title: Migrating from Tumblr and Wordpress to Docpad - Extract and Transform
date: '2014-07-10T21:15+11:00'
comments: true
tags: [blog, tumblr, wordpress, docpad, static site generation, coffeescript, markdown, nodejs]
---


In the previous post, I made [the case for static site generation](http://blog.bguiz.com/2014/07/08/migrating-from-tumblr-and-wordpress-to-docpad-static-site-generation/).
Let us take a look at how to extract data from tumblr and wordpress blogs,
and transform it for [docpad](https://github.com/bevry/docpad),
a static site generator.

### Get Your Node On

    mkdir blog-extract
    cd blog-extract
    npm init #accept all the defaults, it isnot very important
    npm install --save request mkdirp moment tumblr.js
    touch index.js

Edit `index.js`, and add the following:

    var fs = require('fs');
    var url = require('url');
    var path  = require('path');
    var mkdirp = require('mkdirp');
    var moment = require('moment');
    var request = require('request');
    var tumblr = require('tumblr.js');

Now we have a shiny new NodeJs project ready to go,
with batteries (dependencies) included.

### Wordpress Posts API

Wordpress exposes a JSON API that allows you to extract your posts.
There is almost no set up required, as no form or authentication is required.

In order to get our posts, we can follow
[these instructions](https://developer.wordpress.com/docs/api/1/get/sites/%24site/posts/).

#### Extract and transform

With the API documentation in hand, we can now write some code to automate that -
we certainly do not want to be issuing multiple `wget` or `curl` calls,
and then copying the results from them into new files by hand .
I would do that for maybe a couple of posts,
but since I am dealing with about 80 posts here,
and that is certainly going to be too time consuming of an endeavour!

    var pos, step, total;

    var wordpressSite = 'yourblogname.wordpress.com'; // replace with your own
    pos = 0;
    step = 20;
    total = 0;
    do {
        /*
         * Here we do the queries, and be sure to set total so that it loops more than once
         * The looping is necessary, because you cannot download all posts at once
         * and we must paginate the requests
         */
    } while (pos < total);

That is the basic run loop.
Within the run loop, we perform the requests to the wordpress API server:

        var reqUrl = 'https://public-api.wordpress.com/rest/v1/sites/'+wordpressSite+'/posts/?number='+postsAtATime+'&offset='+postIdx;
        request(reqUrl, function(err, resp, body) {
            if (err || resp.statusCode !== 200) {
                console.log(err);
                return;
            }
            body = JSON.parse(body);
            if (body.total_posts > total) {
                //set total count, should only happen the first time
                total = body.total_posts;
            }
            //parse each of the posts in the response
            body.posts.forEach(function(post) {
                //transform the post into the format required by docpad
                //and write to file
            });
        });

We can take a look at what the API response for each blog post looks like in
[these instructions](https://developer.wordpress.com/docs/api/1/get/sites/%24site/posts/).

The format that we need to translate to consists of two important parts:

- Directory and file name
- Metadata

The third part is the post's contents,
but that can be copied verbatim without any transformation.

For a default docpad blog configuration, this would usually be:
`src/documents/posts/slug-for-this-post.html`

We get check this by looking at `docpad.coffee`,
and inspecting `docpadConfig.collections.posts`:

    `@getCollection('documents').findAllLive({relativeDirPath: 'posts'}, [date: -1])`

We are however, not going to put our extracted files in the `posts` folder,
and put them in a `wordpressposts` folder instead.
Instead we will create a separate folder for all the wordpress posts,
and configure docpad to look there as well.
This configuration will be covered at the end,
so if you want to test things out right away,
skip to the bottom of the post

I am using the plugin, `docpad-plugin-dateurls`,
so the URL paths of each of the posts is will match the default wordpress URL paths.
Here, we want the directory and file name to follow this pattern:
`src/documents/wordpressposts/YYYY-MM-DD-slug-for-post.html`

            var postUrl = url.parse(post.URL);
            var pathname = postUrl.pathname;
            if (pathname.charAt(pathname.length - 1) === '/') {
                pathname = pathname.slice(0, -1);
            }
            pathname = pathname.slice(1).replace( /\//g , '-');
            var filename = path.normalize('src/documents/wordpressposts/'+pathname+'.html');

For the metadata, we use moment to format the date and time

            var title = post.title && post.title.replace(/"/g, '\\"');
            var date = moment(post.date).format('YYYY-MM-DD hh:mm');
            var tags = Object.keys(post.tags).join(', ');
            var contents = '---\n'+
                'layout: post\n'+
                'comments: true\n'+
                'title: '+title+'\n'+
                'date: '+date+'\n'+
                'originalUrl: '+post.URL+'\n'+
                'dateurlsOverride: '+postUrl.pathname+'\n'+
                'tags: ['+tags+'\n'+]
                '---\n\n'+post.content;

Finally, write the output to file:

            var dirname = path.dirname(filename);
            mkdirp(dirname);
            fs.writeFile(path.normalize(filename), contents, function(err) {
                if (err) {
                    console.log('Error', filename, err);
                    return;
                }
                console.log('Written', filename);
            });

### Tumblr Posts API

Tumblr is a little more involved than Wordpress,
as in order to query any of their API,
you will need to have a tumblr account
(which you probably already have since you are extracting your posts from it),
and [register a tumblr app](https://www.tumblr.com/oauth/apps)
to obtain an API keys.
Copy your "OAuth Consumer Key", and you are good to go.

Once that is done, we simply need to follow
[this section](https://www.tumblr.com/docs/en/api/v2#posts)
in the documents.
The upside ofthis slightly higher complexity is that tumblr provides
a NodeJs client library that makes it easier to call the tumblr API,
and avoid having to deal with making raw HTTP requests,
like we did for the Wordpress API.

### Extract and transform

    var tumblrSite = 'bguiz.tumblr.com'; // replace with your own
    var client = tumblr.createClient({
        consumer_key: 'sfsdfsdfsdfjkjksjdfhkjkjhkjshdfkjhkjhskdjfhkjhkjhd' //replace with your own
    });
    pos = 0;
    step = 20;
    total = 0;
    do {
        /*
         * Perform the paginated requests
         */
    } while (pos < total);

Performing the requests:

        client.posts(tumblrSite, {
            offset: pos,
            limit: step,
        }, function(err, data) {
            if (err || ! data) {
                console.log(err, data);
                return;
            }
            if (data.total_posts > total) {
                //set total count, should only happen the first time
                total = data.total_posts;
            }
            data.posts.forEach(function(post) {
                //transform the post into the format required by docpad
                //and write to file
            });
        });

Here, we want the directory and file name to follow this pattern:
`src/documents/tumblrposts/YYYY-MM-DD-slug-for-post.html`

            var ts = moment(post.timestamp*1000);
            var postUrl = url.parse(post.post_url);
            var dateStr = ts.format('YYYY-MM-DD hh:mm');
            var filename = 'src/documents/tumblrposts/'+ts.format('YYYY-MM-DD')+
                '-'+postUrl.pathname.split('/').slice(-1)[0]+'.html';

For the metadata, we want to set the `dateurls-override` property.
Note that this feature is not yet available on in `docpad-plugin-dateurls`,
and you will need [my patch](https://github.com/mgroves84/docpad-plugin-dateurls/pull/12)
for this to work.
To get this, modify `package.json` in your root folder,
replacing  the version number of the plugin with an explicit git URI, like so:

    "docpad-plugin-dateurls": "git+ssh://git@github.com:bguiz/docpad-plugin-dateurls.git#exclude-option",

This tells npm to install a NodeJs package, not from the default npm repository,
but instead by cloning a git repository.
Unfortunately, this also means docpad will not be able to run the plugin yet,
as [`npm install`ing a git url does not run `prepublish`](https://github.com/npm/npm/issues/3055).
To work around this, for now, you need to do the following:

    npm install
    docpad run # fails "Error: Cannot find module 'node_modules/docpad-plugin-dateurls/out/dateurls.plugin.js'"
    cd node_modules/docpad-plugin-dateurls
    cake compile && cake install
    ls out #you should see dateurls.plugin.js
    cd ../..
    docpad run # success!

For tumblr posts, the default URL path follows the format
`/post/12345678/slug-for-this-post`,
and if we migrate posts from the old blog to the new blog,
any links, especially external ones, to the site will be broken.
That will make for a really annoying experience for those visiting your sites,
so it is best to preserve URLs where possible;
hence the need to override the default URLs.

            var title = post.title && post.title.replace(/"/g, '\\"');
            var tags = post.tags.join(', ');
            var contents = '---\n'+
                'layout: post\n'+
                'comments: true\n'+
                'title: '+title+'\n'+
                'date: '+dateStr+'\n'+
                'originalUrl: '+post.post_url+'\n'+
                'dateurlsOverride: '+postUrl.pathname+'\n'+
                'tags: ['+tags+'\n'+]
                '---\n\n'+post.body;

Finally, write the output to file:

            var dirname = path.dirname(filename);
            mkdirp(dirname);
            fs.writeFile(path.normalize(filename), contents, function(err) {
                if (err) {
                    console.log('Error', filename, err);
                    return;
                }
                console.log('Written', filename);
            });

### Docpad Configuration Changes

We edit `docpad.coffee`, in the root directory of the docpad project.
Modify `docpadConfig.collections.posts` to look like this instead.

    @getCollection('documents').findAllLive({relativeDirPath: {'$in' : ['docpadposts', 'tumblrposts', 'wordpressposts']}}, [date: -1])

All the wordpress posts should be in `src/documents/wordpressposts`,
tumblr posts in `src/documents/tumblrposts`.
When writing any new docpad posts save them in `src/documents/docpadposts`.

If you have any `docpadConfig.environments` configured,
be sure to modify each of their `collections.posts` accordingly too.

That is all there is to do for now.
Execute `docpad run`, and visit the newly extracted blog in a browser!

### Where to from here?

One task in blog extraction, that we have not covered here, is that of any
static assets, such as images, that may have been hosted on your previous blogs.
Most notably, images.
If you have hosted these on CDNs, they will continue to work.
Otherwise, you will need to extract them too.

Another extraction task that we have not covered are links between posts.
Since we have preserved the path for each post's URL here,
this should not pose a problem.

The solution to both of these involves parsing the URLs in each post's content,
be it `href` attributes in `<a>` tags,
or `src` attributes in `<img>` tags,
and download and save them too.
