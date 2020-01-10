---
title: Let's Encrypt TLS certificates for NodeJs servers
date: '2015-12-16T20:22+11:00'
comments: true
tags: [nodejs, tls]
---

Let's Encrypt is the new certificate authority in town,
enabling developers to generate their own TLS certificates -
which are necessary for running servers over HTTPS -
and it just went into public beta a week or so ago.

By default it is all set up and ready to go for Apache servers.
However, for other varieties of servers -
NodeJs included -
a little more leg work is involved.
That's what this post looks at.
Parts of it are specific to NodeJs,
with the remainder are applicable to any other platform.

We'll cover the following steps:

1. Install Let's Encrypt
2. Initialise a NodeJs project
3. Serving HTTP + HTTPS
4. Authorisation challenge
5. Respond to the authorisation challenge
6. Update TLS certs shell script
7. Set up npm run scripts
8. `cron` job to automate cert renewal

## Install Let's Encrypt

First, ensure that Let's Encrypt is installed,
and is available on your `PATH`:

```bash
mkdir -p "${HOME}/code/"
git clone https://github.com/letsencrypt/letsencrypt "${HOME}/code/letsencrypt"
echo 'export PATH="${PATH}:${HOME}/code/letsencrypt"' >> "${HOME}/.bashrc"
```

## Initialise a NodeJs project

Next create a new project folder (or use an existing one)
for your NodeJs server:

```bash
mkdir -p "${HOME}/code/project"
cd "${HOME}/code/project"
npm init
# create your NodeJs server as you normally would
touch ./update-tls-cerificates.sh
chmod u+x update-tls-certificates.sh
```

## Serving HTTP + HTTPS

Feel free to use your own implementation.

For the sake of completeness,
here is a sample implementation in `koa`.
(If you wish to serve over HTTPS only,
just remove the HTTP parts)

```javascript
// index.js
'use strict';

var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var koa = require('koa');
var server = koa();

// add main routes

// the following routes are for the authorisation challenges
// ... we'll come back to this shortly
var acmeRouter = require('./acme-router.js');
server
  .use(acmeRouter.routes())
  .use(acmeRouter.allowedMethods());

var config = {
  domain: 'example.com',
  http: {
    port: 8989,
  },
  https: {
    port: 7979,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), 'certs/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), 'certs/fullchain.pem'), 'utf8').toString(),
    },
  },
};

let serverCallback = server.callback();
try {
  var httpServer = http.createServer(serverCallback);
  httpServer
    .listen(config.http.port, function(err) {
      if (!!err) {
        console.error('HTTP server FAIL: ', err, (err && err.stack));
      }
      else {
        console.log(`HTTP  server OK: http://${config.domain}:${config.http.port}`);
      }
    });
}
catch (ex) {
  console.error('Failed to start HTTP server\n', ex, (ex && ex.stack));
}
try {
  var httpsServer = https.createServer(config.https.options, serverCallback);
  httpsServer
    .listen(config.https.port, function(err) {
      if (!!err) {
        console.error('HTTPS server FAIL: ', err, (err && err.stack));
      }
      else {
        console.log(`HTTPS server OK: http://${config.domain}:${config.https.port}`);
      }
    });
}
catch (ex) {
  console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
}

module.exports = server;
```

## Authorisation challenge

Let's Encrypt provides several different authorisation mechanisms
for certificate renewal.
Essentially you have to prove that you own the current certificate
in order to be allowed to renew it.
If your server is NodeJs (or anything other than Apache),
you have 3 options:

- `manual` - not scriptable, you have to do it by hand each time
- `standalone` - scriptable, but requires your server to be down for a certain amount of time
- `webroot` - scriptable, and you can keep your server running

We're going to pick the latter option, `webroot`,
because it is both scriptable,
and allows for zero server downtime during cert generation.
The `webroot` option requires a `webroot-path` directory to be specified.
If it doesn't exist, it will be created -
but this is not a good idea,
because the file permissions will be of the root user,
creating problems later on.
We'll pre-empt this by creating the folder ourselves.
We also create an empty file in there
so that a version control system like `git` keeps the folder when cloning it.

```bash
mkdir -p certs/webroot/.well-known/acme-challenge/
touch certs/webroot/.well-known/acme-challenge/.gitkeep
```

## Respond to the authorisation challenge

The `letsencrypt` command line client will use your current certificates
and generate a temporary authorisation token,
and place it in the `webroot-path` that we just created above.
The Let's Encrypt Certificate Authority server will then
make a HTTP request to your server at this path:
`/.well-known/acme-challenge/$SOME_CHALLENGE_HASH`

(substituting `$SOME_CHALLENGE_HASH` with an actual hash of course.)

Thus we need to add a new route to serve up static files from this folder
when such a path is requested.
This is a fairly common thing for web servers to do,
so, again, feel free to use your own implementation.
For the sake of completeness however,
here's one implementation using `koa`.

```javascript
// acme-router.js
'use strict';

let fs = require('fs');
let path = require('path');

let koaRouter = require('koa-router');

let router = koaRouter({});

// point to the middleware we wish to serve
router
  .get(
    'getWellKnownAcmeChallenge',
    '/.well-known/acme-challenge/:challengeHash',
    getWellKnownAcmeChallengeRoute);

function *getWellKnownAcmeChallengeRoute() {
  try {
    let key = this.params.challengeHash;
    let val = yield getAcmeChallengeData(key);
    this.response.type = 'text/plain';
    this.response.body = `${val}`;
    this.response.status = 200;
  }
  catch (ex) {
    console.error(`Error: ${ex}`);
    console.error(ex.stack);
    this.response.body = {
      error: 'Failed to obtain challenge hash',
    };
    this.response.status = 500;
  }
}

function getAcmeChallengeData(key) {
  return new Promise((resolve, reject) => {
    let challengeFilePath = path.resolve(process.cwd(), `certs/webroot/.well-known/acme-challenge/${key}`);
    fs.readFile(challengeFilePath, 'utf8', (err, data) => {
      if (!!err || !data) {
        return reject(`No challenge for key ${key}`);
      }
      val = data.toString();
      return resolve(val);
    });
  });
}

module.exports = router;
```

## Update TLS certs shell script

We are now set up for renewing certificates,
and next we shall automate that,
so that you can fire-and-forget -
and focus on something other than busywork!

We start by creating a shell script
that takes in two parameters,
first the domain,
and second the email address that should
be associated with the certificates for this domain.

First, it calls `letsencrypt-auto` to generate a new certificate,
or renew an existing one,
using the `webroot` authorisation method that we have prepared previously.

Second, it takes the generated keys and copies them into the `certs` folder,

Third, and finally, it executes the `refreshcerts` run script
in your NodeJs module for your server.

```bash
#!/bin/bash
# update-tls-cerificates.sh
# bguiz @ 20151215
# Thanks: https://community.letsencrypt.org/t/node-js-configuration/5175/4

DOMAIN=${1}
EMAIL=${2}
SERVERDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
USERNAME="$( id -u -n )"
GROUPNAME="$( id -g -n )"

if [ -z "${DOMAIN}" ]; then
    echo "DOMAIN must be specified"
    exit 1
fi
if [ -z "${EMAIL}" ]; then
    echo "EMAIL must be specified"
    exit 1
fi

# generate keys
cd ${SERVERDIR}
sudo chown -hR "${USERNAME}:${GROUPNAME}" certs
letsencrypt-auto certonly \
  --webroot \
  --webroot-path "${SERVERDIR}/certs/webroot/" \
  --domain "${DOMAIN}" \
  --email "${EMAIL}" \
  --server "https://acme-v01.api.letsencrypt.org/directory" \
  --renew-by-default \
  --agree-tos

# copy keys
cd ${SERVERDIR}
rm -f certs/{cert,chain,fullchain,privkey}.pem
sudo cp /etc/letsencrypt/live/${DOMAIN}/{cert,chain,fullchain,privkey}.pem certs/
sudo chown -hR "${USERNAME}:${GROUPNAME}" certs

# restart server (so that new keys are used)
cd ${SERVERDIR}
npm run refreshcerts
```

## Set up npm run scripts

In your `package.json` file for your NodeJs server,
we need to put in a `refreshcerts` script.

```json
{
  "scripts": {
    "refreshcerts": "# do something here that tells server to use the new certificates"
  }
}
```

## `cron` job to automate cert renewal

The final piece of the puzzle is to set up a `cron` job
to invoke the shell script that renews your certificates,
and tells your server to refresh them.
Let's Encrypt's certificates expire every 90 days,
and therefore you should renew them at least as often as that.
They recommend doing so once per month.

```bash
sudo crontab -e
```

In the text editor, add the following line:

```
0 0 15 * * /home/user/code/project/update-tls-certificates.sh "example.com" "admin@example.com"
```

This will run our update script on the 15th of every month -
change it to match what you want.

## Fin

That's all there is to to it!

If you want to take this further,
you can consider adding additional things to this routine,
such as emailing yourself whenever a certificate is renewed
(successfully or unsuccessfully).

Many thanks Jonne Haß from the Let's Encrypt community forums
for patiently helping me to troubleshoot the problems I encountered along the way.
