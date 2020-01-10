---
title: Async Ascendance in Javascript
date: '2016-01-04T18:36+11:00'
comments: true
tags: [javascript, async]
---

## What & Why Asynchronous?

When you write a program, a lot of time is spent waiting for something.
In fact, most programs spend most of their time idling,
waiting for something to happen,
and then burst into life in short spurts whenever things need to happen.
The most common one is waiting for user input -
for a user to type something into a form,
or to press a button -
but there are many other things that aren't user-related that
programs typically have to wait for:
Reading or writing files to disk,
and waiting on network latency,
and many, many more.

Now, if your program was extremely selfish,
it could simply hog all the resources on your computer while waiting on these things.
The problem is that users don't like selfish programs,
because they "hang" the computer -
that is, when the computer becomes unresponsive.

Adding asynchronous execution capabilities to your program
makes it a much less selfish consumer of the resources on a computer,
and thus the computers don't "hang", and users are happy.
This is pretty much default practice,
and you'll be hard pressed
(although it is not impossible)
to find programs that do not incorporate some form of asynchronous code execution.

## The "standard" way, and the Javascript way

Most programs are able to execute their code asynchronously by employing threads.
Threads are a where a single process defines more than one execution path,
leaving the operating system to time slice to share resources between each of them.

This is not how Javascript environments do it,
because Javascript is single-threaded.
Instead Javascript achieves asynchronous code execution
using its own run-time engine to store events
(asynchronous execution entry points)
and execute them in an event loop.
Essentially this is also time slicing,
except that since it doesn't operate at the operating system's kernel level,
as a developer you need to reason about it in a different manner
than you would do when programming using threads.

*Footnote:*
There are various proposals for Javascript to support multiple threads,
such as WebWorkers,
but these haven't come to fruition yet.

## How to Asynchronous

Say you call Sync Sam,
as well as Async Alice,
and ask give each of them a task to do.
Usually that works out in one of two ways:

1) You can say, "I'll stay on the line,"
and wait while they do the task,
twiddling your thumbs in the mean time.

2) You can say, "How about you call me back at this number, when you're done?"
Then hang up, and wait for them to call you back,
and you can do whatever you feel like until she does.

Both options are valid in different scenarios.

Let's say that the task was for Sync Sam to
retrieve someone's address and give it to you.
He has it on a sticky note somewhere at her desk,
so she can get back to you almost right away.
In this scenario, the first option,
where you stay on the line is the valid one.

Let's say, instead, that the task for Async Alice was a bit more involved.
It involves her picking up something from the store around the corner.
That would take much longer than would make sense to sit waiting on the phone.
So the latter option, where you ask Async Alice to call you back when she
has completed the task would make much more sense.

In other words, when you expect the task to be completed immediately,
you should simply wait for the task to be done.
When you expect the task to take a while to complete,
you should do something else instead, and wait to be notified before resuming;
and this is precisely what a callback does.
Callbacks are the basic building block of asynchronous programming
in Javascript.
Currently, there are four mechanisms:
callbacks and three others, each of which build upon callbacks.

1. callback functions,
2. promises,
3. generator functions, and
4. `async` functions.

Let's take a look at each of them.

### Callback Functions

Callbacks are the most basic, and easy to grasp,
way to do things asynchronously.
You are simply providing a function,
and telling the Javascript engine to call you back when it is done doing whatever,
by calling the function.
Hence the name "callback".

Now let's a look at callbacks in action:

```javascript
callerFunction();

function callerFunction() {
  console.log('I am going to call three nested callback functions');
  asyncUsingCallbackFunction('foo', function errBackFunction(err, result) {
    if (!!err) {
      console.log('There was an error:', err);
    }
    else {
      secondAsyncUsingCallbackFunction(result, function errBackFunction(err, result) {
        if (!!err) {
          console.log('There was an error:', err);
        }
        else {
          thirdAsyncUsingCallbackFunction(result, function errBackFunction(err, result) {
            if (!!err) {
              console.log('There was an error:', err);
            }
            else {
              console.log('Here is the result:', result);
            }
          });
        }
      });
    }
  });
}

function asyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'bar');
  }, 300);
}

function secondAsyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'baz');
  }, 300);
}

function thirdAsyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'meh');
  }, 300);
}
```

Run this using NodeJs.
You should get the output: `Here is the result: foobarbazmeh`,
but you will have to wait for just under a second before it pops up.
Try tracing the control flow as the program executes.

- The `callerFunction` simply runs two lines of code and then returns
- This would normally mean that the program has finished execution and exit
- However, it does not, because in the second line,
  `asyncUsingCallbackFunction` is called,
  and its second parameter happens to be a callback function.
- This callback function gets added to the stack in the event loop
  (well, technically, the anonymous function passed into `setTimeout`
  within it is the one that get added)
- When that function is done executing,
  it gets popped off the stack and gets executed by the event loop.
- The same thing happens with `secondAsyncUsingCallbackFunction`,
  and `thirdAsyncUsingCallbackFunction` in turn, recursively.

Here is a great animation that
[demonstrates Javascript's event loop](http://latentflip.com/loupe)
which I like very much.

Observe how the callback functions are "nested" within each other.

### Promises

While it is possible to write virtually any sort of asynchronous code
in Javascript, using only callbacks,
it only really tends to work well for simple tasks where there are one or two
asynchronous tasks that need to be done.

In more complex tasks where there are many asynchronous tasks,
if you were to write your code suing just callbacks,
you would wind up with an anti-pattern known as
"callback hell" or "pyramid of doom".

Promises have emerged to solve this problem.
The main benefit that you get from promises are:

1. You can write your asynchronous code in a "flat" way.
2. Instead of multiple error handlers (one for each asynchronous function),
   you can have a single error handler which handles errors across them all.

Promises first came out as Javascript libraries -
`Q`, `RSVP`, and `bluebird` are amongst the most popular -
and these exposed functions that would wrap callbacks in clever ways.
This evolved into a specification, and
now, with ES6, the latest edition of Javascript,
promises are built into the language itself.

Let's take a look at promises in action:

```javascript
callerFunction();

function callerFunction() {
  console.log('I am going to call three chained promise functions');
  asyncUsingPromise('foo')
    .then(secondAsyncUsingPromise)
    .then(thirdAsyncUsingPromise)
    .then(function(result) {
      console.log('Here is the result:', result);
    })
    .catch(function(err) {
      console.log('There was an error:', err);
    });
}

function asyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
}

function secondAsyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'baz');
    }, 300);
  });
}

function thirdAsyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'meh');
    }, 300);
  });
}
```

Run this file using NodeJs and you'll get the same result as before,
when using callbacks.
The main difference lies in the syntax.
Each of the functions,
`asyncUsingPromise`, `secondAsyncUsingPromise`, and `thirdAsyncUsingPromise`,
are now slightly more complex than before:
we have to wrap them with `new Promise()` syntax.
However, doing this allows us to write the asynchronous code in a "flat" way -
avoiding deep nesting -
and also means that we only have to write the error handling code once.
This makes it easier to reason about the code while writing it.

### Generator Functions + `yield`

Generator functions, used together with `yield`,
are yet another way in which you can
do asynchronous programming,
and they have also landed in ES6 Javascript.

Let's take a look at generator functions in action:

```javascript
var co = require('co');

callerFunction();

function callerFunction() {
  co(function * () {
    console.log('I am going to yield three consecutive generator functions');
    try {
      var firstResult = yield asyncUsingGenerator('foo');
      var secondResult = yield secondAsyncUsingGenerator(firstResult);
      var thirdResult = yield thirdAsyncUsingGenerator(secondResult);
      console.log('Here is the result:', thirdResult);
    } catch (err) {
      console.log('There was an error:', err);
    }
  });
}

function asyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
}

function secondAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'baz');
    }, 300);
  });
}

function thirdAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'meh');
    }, 300);
  });
}
```

Run `npm install co` to install the `co` library
before running the above file with NodeJs.
You'll get the same result as before,
when using promises or callbacks.

Note that each of the functions,
`asyncUsingPromise`, `secondAsyncUsingPromise`, and `thirdAsyncUsingPromise`,
have not changed at all from the promise-based code.
These functions still return promises.

What has changed,
is the way in which they are called, from `callerFunction`.
Firstly, the contents of `callerFunction` has now been
wrapped in an anonymous function, which has been, in turn,
wrapped in a `co` function, like so:

```javascript
co(function * () { /* do stuff */ });
```

You'll also notice, that the anonymous function has an asterisk
between the function keyword and the parentheses for its parameters.
This is what marks a function as a generator function.
Generator functions are allowed to use the `yield` keyword
within their body.

Now that we have got the syntax/ semantics out of the way...
let's look at the main benefit,
and that is that you can write asynchronous code
using syntax that is identical to the way you would write synchronous code.

- With callback functions, the "return value" of the asynchronous function
  would come as the parameter of the callback function
- With promises, the "return value" of the asynchronous function
  would come as the parameter in the next function in the promise chain
- With generator functions, you the "return value" would
  **actually be** a return value,
  and you can assign it to a variable in line using `var` (or `let`) ...
  just like you would when writing synchronous code.

A parallel exists for error handling as well.

- With callback functions, errors are handled within the callback function
  by testing a parameter of the callback function
- With promises, errors are handled by the `catch` function in the promise chain
- With generator functions, errors are handled using a `try ... catch` block ...
  just like you would when writing synchronous code.

Being able to write asynchronous code with syntax that is
so close to synchronous code is *brilliant*.
Promises are an improvement over callback functions
because they remove the mental overhead of looking at deeply nested syntax.
Generator functions are an improvement on promises -
in fact they *make use of* promises -
because they remove the mental overhead of thinking in terms of promise chains.

*Footnote:*
Generator functions and `yield`, on their own,
are not language constructs
designed to provide asynchronous code execution.
It is more general purpose than that.
For example, you can use them to output infinite sequences of numbers,
which is useful for mathematical applications and pure functional programming,
but has nothing to do with asynchronous programming techniques.
This is what the `co` library is used for -
to take generator functions,
and adapt them for the specific purposes of asynchronous code execution.
Think of `co` as a "runner" for generator functions.

### `async` Functions + `await`

`async` functions, used together with `await`,
are an even newer way in which you can do asynchronous programming.
So new, in fact, that they have yet to become "officially" part of Javascript.
They are slated for ES7,
the next edition of Javascript.
You can, however, use them today
via your transpiler/ polyfiller of choice, e.g. `babel`.

Let's take a look at `async` functions in action:

```javascript
callerFunction();

async function callerFunction() {
  console.log('I am going to await three async functions');
  try {
    var firstResult = await asyncUsingPromise('foo');
    var secondResult = await secondAsyncUsingThunkify(firstResult);
    var thirdResult = await thirdAsyncUsingPromisify(secondResult);
    console.log('Here is the result:', thirdResult);
  } catch (err) {
    console.log('There was an error:', err);
  }
}

function asyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
}

function secondAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'baz');
    }, 300);
  });
}

function thirdAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'meh');
    }, 300);
  });
}
```

Run `npm install babel` to install the `babel` transpiler
before running the above file with `babel`'s interpreter:
`./node_modules/.bin/babel-node`.
You need to do this because ES7 Javascript is not out yet -
we're currently on ES6 -
and so we'll need a transpiler to get it running.
You'll get the same result as before,
when using generator, promises, or callbacks.

Note that each of the functions,
`asyncUsingPromise`, `secondAsyncUsingPromise`, and `thirdAsyncUsingPromise`,
have not changed at all from either the promise-based code
or the generator-based code.

What has changed from the generator-based `callerFunction` is that
instead of using `co` as the "runner" that wraps a generator function,
the entire `callerFunction` itself is now marked with the `async` keyword.
This allows `callerFunction` to use the `await` keyword -
in a manner *very similar* to the way that generator functions use `yield`.
Essentially, there is no need for a "runner" function any longer -
instead, these are supported natively.

## Review

Let's recap the different method of asynchronous programming
available in Javascript.

1. Callback functions
  - The most primitive method
  - "Pyramid of doom"
  - Available since 1st ever Javascript
2. Promises
  - Flattens the "pyramid of doom"
  - Consolidates error handling
  - Available as libraries in ES5, and natively in ES6
3. Generator functions + `yield`
  - Can write using synchronous code syntax
  - Need to use `co` (or other similar) library as a "runner"
  - Available natively in ES6
4. `async` functions + `await`
  - Can write using synchronous code syntax
  - Available in the future in ES7, and via transpilers in ES5 & ES6

Each of these methods have their own pros and cons,
and it is up to you to pick which is appropriate.
My own approach at the moment is to
use callback functions, as they hard to beat for basics.
For more complex things, on the other hand,
I currently use generator functions with promises.
When using together with older packages,
use the `es6-promisify` NodeJs package
to "promisify" their callback functions.
If you're willing to live on the bleeding edge,
go for `async` functions;
however keep in mind the risk that its syntax could
change considerably before it officially becomes part of ES7.

It is nice to see the evolution of Javascript in general as well,
going from primitive constructs to more advanced and expressive ones with time.
Writing asynchronous Javascript code is much much easier to do now
than it used to be, and as this trend continues, the future's bright!
