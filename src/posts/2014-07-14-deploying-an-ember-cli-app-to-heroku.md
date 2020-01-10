---
title: Deploying an ember-cli app to Heroku - Demo Apps Only!
date: '2014-07-14T19:27+11:00'
comments: true
tags: [emberjs, nodejs, ember-cli, deploy, heroku]
---

Deploying to Heroku is easy... if you can figure out all of the hidden gotchas!

### No dev dependencies

That means that you cannot depend on any global `npm` packages.

Since `ember-cli` install itself locally by default,
the only global package you will need is `bower`.

    npm install --save bower

#### Except ember-cli

... which must be in both `dependencies` and `devDependencies`.

This is because the `ember` command inspects the `package.json`
in the file, looking for `ember-cli`.
It does this to determine if that project is indeed an `ember-cli` app.
If it does not find this there,
it will display an error saying that you need to run the command from within
a folder containing an ember-cli app.

If this is too much trouble for what it is worth,
simply issue this command instead:

    heroku config:set NODE_ENV=staging

... so that Heroku will run `npm install` instead of `npm install --production`
when it spins up the dyno.

### Server on `web` Proc only

The process that runs the server *must* be called `web`.
Do not call it `main` or anything else.
If you want to access a server running on a Heroku dyno from port `80` externally,
that server *must* be running in a `Proc` named `web`.
I wish Heroku's documents actually stated this explicitly.

    web: npm run start

### Use `scripts` in `package.json`

NodeJs packages may define an optional `scripts` section in their `package.json` file.
For ember-cli apps, use `scripts.postinstall` to do a `bower` install;
and use `scripts.start` to start run `ember serve`

#### Use the `PORT` environment variable

When running ember serve, do not use a default port number.
Whenever heroku spins up a dyno (which happens at least once per deploy),
it will assign a new port number (among other things),
and this is the one that Heroku will port forward from port `80`.

    "scripts": {
        "start": "./node_modules/ember-cli/bin/ember serve --environment=production --port=${PORT}",
        "build": "./node_modules/ember-cli/bin/ember build",
        "test": "./node_modules/ember-cli/bin/ember test",
        "postinstall": "./node_modules/bower/bin/bower install"
    },

Note that `npm install` is not necessary in `scripts.postinstall` -
Heroku does that automatically for all NodeJs projects.

## A Word of Caution

You should not use `ember serve` to deploy production apps.
There are possibly some security and performance problems that this entails.
But of course, sometimes you simply want to deploy a demo app,
and in these cases deploying and ember-cli app like this works quite well.

## New to Heroku? - Quick Run-down

Heroku is a cloud hosting service,
which allows you to spin up and down instances on the fly.
You can operate it entirely via the command line by installing Heroku toolbelt,
and deployment happens by pushing to a git remote hosted on Heroku.

If deploying to Heroku for the first time,
you will need to set up the requisites on your computer

    wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
    # for other OS'es: https://toolbelt.heroku.com/
    ssh-keygen # save to id_rsa_heroku
    echo "Host heroku.com" >> ~/.ssh/config
	echo " IdentityFile ~/.ssh/id_rsa_heroku" >> ~/.ssh/config
	chmod 600 ~/.ssh/config
	heroku keys:add

To get a NodeJs app up and running on Heroku,
first create the app, and when ready for deployment:

    git init # if you have not done so already
    git add . && git commit -a # commit whatever should be deployed
    heroku create name-of-your-app
    git push heroku master

Heroku's git repository has a post-hook that runs upon each push,
which will attempt to (re)install and (re)deploy your app,
and the push will only succeed if it the installation and deployment succeeds.
