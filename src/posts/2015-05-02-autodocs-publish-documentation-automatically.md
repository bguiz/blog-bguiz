---
title: Automatically publish documentation using Autodocs
date: '2015-05-02T12:53+11:00'
comments: true
tags: [javascript, opensource, nodejs, publish, documentation]
---

I have been working on a NodeJs module quite diligently over the past couple of weeks,
and I have finally cut a release that I am satisfied with releasing for wider use.

[![NPM](https://nodei.co/npm/autodocs.png)](https://github.com/bguiz/autodocs/)

[![Build Status](https://travis-ci.org/bguiz/autodocs.svg?branch=master)](https://travis-ci.org/bguiz/autodocs)
[![Coverage Status](https://coveralls.io/repos/bguiz/autodocs/badge.svg?branch=master)](https://coveralls.io/r/bguiz/autodocs?branch=master)

Install it as a development dependency

```bash
npm install --save-dev autodocs
```

... and then add an `autodocs` hook to the `scripts` section of `package.json`:

```json
"scripts": {
  "autodocs": "node ./node_modules/autodocs"
}
```

... and then invoke the `autodocs` hook in `.travis.yml`

```yaml
after_success:
- npm run autodocs
```

Finally configure `autodocs` by specifying environment variables,
also in `.travis.yml`.
The only compulsory one is `GH_TOKEN`,
a Github access token,
which you will need to obtain from Github,
and then encrypt using Travis.

Note that `autodocs` does not generate any documentation itself -
it is designed to **publish** documentation from a continuous integration server.
It expects there to be a hook named `generatedocs` the `scripts` section of `package.json`.

That's all.
Commit and push to your `master` branch,
and you should get your documentation published to:

`http://GH_USER.github.io/GH_REPO/api/VERSION`

## Documentation

There are quite a few options that you can configure.

For example, you can set it up such that:

- the URL it publishes to is differrent,
- it publishes to a different repository,
- it publishes when a different branch, e.g. `develop` is pushed instead
- it publishes when a release is cut - a tag is pushed

For these, and more options, see `autodocs`' own documentation,
which, you guessed it, is published by `autodocs` itself.

[`autodocs` documentation](http://bguiz.github.io/autodocs/api/latest/)

## Roadmap

At the moment, `autodocs` only supports on CI environment - Travis -
and one publishing environment - Github Pages.
Other CI environments and publishing environments can also be supported.

These, and other issues, can be found at
[`autodocs` roadmap](https://github.com/bguiz/autodocs/labels/roadmap)

Contributions are most welcome!

<blockquote class="twitter-tweet" lang="en">
  <p lang="en" dir="ltr">
    autodocs - automatically publish docs for <a href="https://twitter.com/hashtag/nodejs?src=hash">#nodejs</a> modules on <a href="https://twitter.com/github">@github</a> pages from <a href="https://twitter.com/travisci">@travisci</a> <a href="https://t.co/aWIS8QWiCA">https://t.co/aWIS8QWiCA</a> <a href="http://t.co/kEaVHwvHPr">pic.twitter.com/kEaVHwvHPr</a></p>&mdash; Brendan Graetz (@bguiz) <a href="https://twitter.com/bguiz/status/594331457272709120">May 2, 2015</a>
  </p>
</blockquote>
