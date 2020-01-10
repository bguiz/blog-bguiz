---
title: Unit and Integration Testing Front-end Javascript
date: '2016-03-08T21:47+11:00'
comments: true
tags: [test, unit, integration, automation, javascript, frontend]
---

tl;dr= Reference/starter project can be found at
[github.com/bguiz/front-end-js-testing](https://github.com/bguiz/front-end-js-testing "Front-end Javascript Testing starter/ reference project")

## Testing NodeJs vs Testing Front-end

When developing a NodeJs application,
testing it can be quite straight forward,
in the sense that you simply need to to interact one thing:
your *Javascript modules*.

This is fairly easy to do if your test runner or framework
is also written in NodeJs -
all you have got to do is `require()` the necessary modules in,
anything from an individual function to the entire application,
and run your tests against them.

It is not quite so simple with front-end Javascript,
because there is an *additional* thing that you have to deal with:
*the browser*.

It does not suffice to point your test runner or framework
at your Javascript modules and expect them to run.
Inevitably, they'll need access to
`window`, `document`, a `DOMElement` of some variety,
or any number of other things that only a browser would give you access to.

## Browser-based Test Runners

The solution to the problem above is to use test runners which
have browser capabilities.
That is, the test runner is able to start and stop browsers that are installed
on the local system (or even on remote ones),
and run test cases within the browser while they are open.

This way, you can test your front-end Javascript code
in an *actual browser* environment.

In any type of software testing,
there are two paradigms:
there are unit tests, and there are integration tests.
Different browser-based test runners lend themselves more naturally
to each of these paradigms,
and we'll take a look at those next.

## Unit Testing using Karma

Unit testing is sometimes referred to as white-box testing.

It is where you do not concern yourself with
the overall application,
but rather the individual bits and pieces used to build the application.
The focus here is on testing individual methods and functions,
and getting very specific on on how each of them perform in isolation.
Testing each unit of software,
hence the name *unit testing*.

[Karma](https://karma-runner.github.io/)
is a browser-based test runner
that is very well suited to doing unit testing.

## Integration testing using WebdriverIO

Integration testing is sometimes referred to as black-box testing.

It is where you do not concern yourself with
the individual bits and pieces used to build the application,
but rather the overall application.
The focus here is on testing the application as a whole,
similar to how an end-user might interact with your application.
Testing the how the entire software works together,
hence the name *integration testing*.

[Webdriver.io](https://webdriver.io/)
is a browser-based test runner
that us very well suited to doing integration testing.

## Starter/ Reference Project

I have put together a trivial front-end Javascript application.
It has two buttons,
and pressing each one of them results in a different piece of text
getting put on the screen.
(When I said trivial, I meant *trivial*).

The intent was, of course,
not the application itself,
but rather to expose the mechanics of testing it,
and to that end, it is sufficient.

The complete project,
including the setup and config for both Karma and WebdriverIO,
and sample unit tests and sample integration tests
are available at:
[github.com/bguiz/front-end-js-testing](https://github.com/bguiz/front-end-js-testing "Front-end Javascript Testing starter/ reference project")

### Asynchronous Assertions using Chai

The first thing to note is that in the Javascript world,
nearly everything is asynchronous.
There quite likely are a mix of
callback functions,
promises,
generator functions, and
`async` functions
in most Javascript applications.

For a primer on asynchronous Javascript, check out:
[Async Ascendance in Javascript](/2016/01/04/async-ascendance-in-javascript)

This means that our tests need to take that into account.

For this, in the starter project,
we will extend our assertions library, `chai`,
with `chai-as-promised`,
so that we can use `expect(somePromise).to.eventually.equal(someValue)`.

### NodeJs Test Runner within a Browser-based Test Runner

Just because we are using browser-based test runners,
does not mean that we need to learn a complete new structure
for writing our test cases.

Test runner libraries such as Mocha and Jasmine
can be included within both Karma and WebdriverIO
as a framework,
and therefore you can continue writing test cases
using syntax that is already familiar.

For this, in the starter project,
we will be including Mocha as a framework
within both Karma and WebdriverIO.

### Front-end Framework Agnostic

It is worth pointing out at this juncture
that the set up for this project is
intentionally agnostic to the Javascript framework
that the application may have been written with.

BackboneJs, AngularJs, EmberJs, ReactJs, et cetera,
and all of their accompanying library and tool stacks
quite often come bundled with their own testing utilities.
Where this is not the case,
the community of developers usually has a consensus
around their preferred testing utilities.

This project however chooses to work with
testing utilities and tools that are not tied to any one particular framework.
In theory, they would work just as well with vanilla Javascript applications,
as they would with Javascript application built using one of these front-end frameworks.

### Set up for the System Under Test

The front-end Javascript application we will be testing
in this case in the system under test.

```bash
npm install --no-progress
npm run global-install
npm run build-dev
```

In the directory of the starter project,
run the commands above.
This sets up both the local and global dependencies,
and uses Webpack to bundle the Javascript sources,
and uses `http-server` to serve static files on `localhost`.

This step does not have anything to do with testing,
just to do with the system under test.
By all means, use any other set of tools to get this done,
as there are a myriad of different way to do this.

### Set up and run Karma Unit Testing

Look in
[`package.json`](https://github.com/bguiz/front-end-js-testing/blob/develop/package.json),
in the `devDependencies` section, and you'll find these:

```
"karma": "^0.13.8",
"karma-chrome-launcher": "^0.2.0",
"karma-mocha": "^0.2.0",
"karma-sinon-chai": "^1.0.0",
"karma-webpack": "^1.7.0",
```

These have already been installed as part of the previous step.

Next look in
[`karma.conf.js`](https://github.com/bguiz/front-end-js-testing/blob/develop/karma.conf.js),
and you'll find this:

```
files: [
  'test/unit/**/*.spec.js'
],
```

This tells Karma to run any `*.spec.js` files
found in `test/unit` or its subdirectories.

Finally let us look in this folder,
and we see `test/unit/sample-unit.spec.js`,
which contains a couple of unit tests for `src/function-to-test.js`.

In order to run these unit tests, we can enter the following command:

```bash
npm run unit-test-background
```

Take a look in the `scripts` section of
[`package.json`](https://github.com/bguiz/front-end-js-testing/blob/develop/package.json)
to see exactly what this does.

A new browser window should open,
run through the tests once,
and then idle.
Switch back to the command prompt,
and you will see the test output.

Try modifying the test file, `test/unit/sample-unit.spec.js`
by inserting a new test case,
or modifying one that is already there.
When you save the file,
the tests should re-run,
giving you potentially different results.

If we wish for the tests to just run through once, and exit right away,
instead of idling, and waiting for some changes,
we can run the following command instead:

```bash
npm run unit-test
```

## Set up and run WebdriverIO Integration Testing

Take a look in the `scripts` section of
[`package.json`](https://github.com/bguiz/front-end-js-testing/blob/develop/package.json),
and you'll find the following lines:

```
"global-install": "npm i --global selenium-standalone@5.0.0 http-server@0.9.0 && selenium-standalone install",
"start-selenium-server": "selenium-standalone start",
```

Look in
[`package.json`](https://github.com/bguiz/front-end-js-testing/blob/develop/package.json),
in the `devDependencies` section, and you'll find these:

```
"wdio-mocha-framework": "^0.2.11",
"webdriverio": "^3.4.0",
```

These commands did various global and local installations.
WebdriverIO uses a well known 3rd-party browser testing protocol,
the Selenium protocol,
in order to do its integration testing.
This requires it to have a Selenium server installed and running
before running the tests.

To start the Selenium server now, we run:

```bash
npm run start-selenium-server
```

Leave that process running, while we examine the project further.

Open up
[`wdio.conf.js`](https://github.com/bguiz/front-end-js-testing/blob/develop/wdio.conf.js),
and you will see:

```
specs: [
    './test/integration/**/*.spec.js'
],
```

This tells WebdriverIO to run any `*.spec.js` files
found in `test/integration` or its subdirectories.

Finally let us look in this folder,
and we see `test/integration/sample-integration.spec.js`,
which contains a couple of integration tests for the application as a whole.

In order to run these integration tests, we can enter the following command:

```bash
npm run integration-test
```

You should see, similar to when we ran Karma unit tests previously,
the browser window open while running through the tests.
The results of the tests will be visible in the terminal as well.

The difference that you'll notice,
from when running the unit tests,
is that we actually see the system under test appearing in the browser,
and the browser automatically whirring through each of the steps.
Usually this is slow enough for us to see each of the steps briefly,
but faster than any human would be able to execute by hand.

## Walkthrough

We have just gone through
the basics of setting up, configuring, and running
both unit tests and integration tests for
system under test -
in this case also known as "the world's most rudimentary front-end Javascript application".

We have discussed neither
the configuration,
nor the syntax of the test cases, in detail.
That is perhaps something for a follow up post!
