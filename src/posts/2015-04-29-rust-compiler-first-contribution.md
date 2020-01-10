---
title: First contribution to Rust Compiler
date: '2015-04-29T19:12+11:00'
comments: true
tags: [rust, opensource]
---

I made my first contribution to the Rust compiler yesterday evening!

![Rust logo](/images/posts/rust-logo.svg)

The learning curve was quite steep,
so I started with something relatively simple -
adding a detailed error message for one of the errors thrown by the compiler.

If only for my own future reference,
I detail the entire process below:
Compiling --> Verification --> Submission --> Acceptance --> CI

## Compiling

Compiling `rustc` for the first time:

```bash
git clone https://github.com/rust-lang/rust.git
cd rust/
./configure
make -j 4
sudo make install
```

Now edit some source code to add the new feature or fix the bug.

### Re-compiling

After making some changes:

```bash
make -j 4 rustc-stage1
export PATH=$( pwd )/${PLATFORM}/stage1/bin:$PATH
export LD_LIBRARY_PATH=$( pwd )/${PLATFORM}/stage1/lib
which rustc
rustc --version
```

(The value of `${PLATFORM}` should be obtained from the build output, e.g.
`x86_64-linux-gnu` or `x86_64-apple-darwin`)

Instead of compiling the entire project all over again,
which will take extremely long,
simply compiling one of the compile targets (`rustc-stage1`),
and adding the relevant output files to the executable and library paths
is a much quicker alternative.

## Verifying the fix

In my case, the change was to add the detailed explanation message for
a particular error message.
To test this, run the `--explain` command:

```bash
rustc --explain E0265
```

Which should output the following;

<pre>
  This error indicates that a constant references itself.
  All constants need to resolve to a value in an acyclic manner.

  For example, neither of the following can be sensibly compiled:

  ```
  const X: u32 = X;
  ```

  ```
  const X: u32 = Y;
  const Y: u32 = X;
  ```
</pre>

## Submitting the patch

Once the patch is OK,
fork the repository on github,
commit and push to your fork on a new branch,
and then submit a pull request for your patch.

[Fork the repository on github](https://github.com/rust-lang/rust#fork-destination-box)

Switch the remotes such that the `upstream` points to the `rust-lang` organisation's repository,
and the `origin` points to the your forked copy of the repository.

```bash
git remote add upstream git@github.com:rust-lang/rust.git
git remote remove origin
git remote add origin git@github.com:${GH_USER}/rust.git
```

Commit and push:

```bash
git checkout -b ${SOME_BRANCH_NAME}
git add src/
git commit
# Enter a commit message
git push origin ${SOME_BRANCH_NAME}
```

[Visit the main repository on github again](https://github.com/rust-lang/rust),
and click on the link for "compare and create pull request".

This results in a pull request:
[github.com/rust-lang/rust/pull/24894](https://github.com/rust-lang/rust/pull/24894)

## Patch acceptance and Continuous Integration

Someone from the core team or reviewers team for Rust
will get assigned to review the pull request,
and if it passes their review, they will add a comment like this:

> @bors: r+ `${COMMIT_HASH}`

This triggers the Bors Github bot,
and the patch is added to the Homu build queue.
Visit the build queue, and find your patch on the list:

[buildbot.rust-lang.org/homu/queue/rust](http://buildbot.rust-lang.org/homu/queue/rust)

Note that you will find that the project contains a
[`.travis.yml` file](https://github.com/rust-lang/rust/blob/master/.travis.yml).
This led me to believe, initially,
that Rust uses Travis as its continuous integration system.
However, it only uses Travis for `make tidy`,
which is essentially a linting task.
I assume that this is because compiling rust takes a lot longer than
the maximum of forty minutes per build allowed by Travis.
The actual CI infrastructure for Rust consists of a couple of Github bots
- [rust-highfive](https://github.com/rust-highfive)
and [bors](https://github.com/bors) -
and their own CI server - [Homu](https://github.com/barosl/homu).

## Experience

As mentioned earlier, it was an extremely steep learning curve.

It takes **extremely long** to compile the project from scratch.
Even just the `rustc-stage1` target, takes ages.
This is quite a big inhibitor for further contributions,
as one would have to have access to an extremely powerful build machine
in order to attain a reasonable amount of productivity developing Rust itself.
If possible, I would like this to change.
Perhaps break the project up into several smaller ones,
and make it possible just to recompile the ones that changed.

This problem spills over to the build queue as well.
It took just under two days for my patch to get compiled and tested
by the continuous integration system,
and get merged in.

Luckily I had a couple of experienced guys to guide me -
thanks to [Michael](https://github.com/michaelsproul)
and [Huon](https://github.com/huonw)
for walking me through the innards of `librustc` and `libsyntax`!

## Now your turn!

If you are interested to get your contributions on,
[this issue](https://github.com/rust-lang/rust/issues/24407)
is a good place to start.

At first I attempted to fix
[this one](https://github.com/rust-lang/rust/issues/24889),
however, it was beyond my current Rust skills,
so I have had to let that be.
Double points to anyone who tackles that!
