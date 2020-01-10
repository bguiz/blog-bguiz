---
title: Installing NodeJs on Mac and Linux
date: '2015-02-23T23:31+11:00'
comments: true
tags: [nodejs, mac, linux, sudo]
---

So you have tried the
[official install instructions](https://github.com/joyent/node/wiki/Installation)
for installing NodeJs, but you are running into problems with the installation.

## Installation Problems

For the Windows platform, NodeJs allows you to choose the directory in which to install the platform, so you will not face any issues.

For Linux and Mac, there is an issue,
because the installer defaults to `/usr/local` or `/usr/lib`,
which are directories that require `sudo` access to write files to.

Thus, whenever you do a global installation of a node module,
it attempts to install it in a subdirectory which requires `sudo` access.

### `EACCESS`

When the NodeJs platform is installation in a directory that requires `sudo access`,
any global installs will result in a bunch of errors of type `EACCESS`,
which you will see output to your terminal.

A rookie mistake, upon seeing these, would be to ignore them,
and simply repeat your previous global installation command,
this time with the `sudo` command in front of it.
After all, after the error messages,
this is precisely what the suggested fix is.

This will appear to work at first, as the installation will succeed.
However, it sets you up for inevitable failure down the road,
as sooner or later the need to use `sudo` will **spread** -
to pretty much **all** NodeJs related activities,
and you might find that unless you start your IDE using `sudo`,
your projects cannot build.
Now you are in over your head!

## Solutions

### Compile from source

If you are the sort who is unfazed when dealing with C compilers,
and are a command line whiz, then this is *the* option for you.
Chances are, however, if you fall into this category,
you would have defaulted to this route anyway -
instead of getting stuck and reading this article!

### homewbrew

If you are on Mac, and you already have [homebrew](http://brew.sh/) installed,
then you can simply do:

```bash
brew install node
```

... to install the latest version of NodeJs.

### NVM

For everyone else, there is Node Version Manager.

In a nutshell, what NVM does is to install the NodeJs platform
in a subdirectory of your user home directory,
by compiling from source -
taking care of all the required steps.
It then sets up symbolic links and
various environment variables to ensure that it can run.
It also allows you to install multiple versions of NodeJs side by side,
and switch between them rather effortlessly.

The main thing that we care about in all of this, however,
is simply the fact that NVM is the easiest way to install the NodeJs platform
in a directory that does not require `sudo` access.

## Installing NVM

Project page: https://github.com/creationix/nvm

* Open a terminal.
* Mac only:
  * Enter the following command: `touch ~/.profile`
  * This creates an empty file in your home directory if it is not already present,
    and is a prerequisite to installing NVM
* Linux only:
  * If you are using Linux, this not required,
    because a `~/.bashrc` file is used instead,
    and would already exist by default.
  * If, however, you are using a different shell than `bash`,
    such as `zsh` or `ksh`,
    ensure that the appropriate terminal start script contains
    `source ~/.nvm/nvm.sh`.
* Follow the "Install Script"
  [instructions](https://github.com/creationix/nvm#install-script)
* Now close the terminal, and open a new one
  * This is done to ensure that the environment variables
    are set up correctly in the new shell

### Installing a default NodeJs

* In the terminal, enter the following commands:
  * `nvm install 0.10`
  * `nvm alias default 0.10`
  * `nvm use default`
* You may choose any version you like:
  Instead of `0.10`, you could choose `0.11` or `0.12`, or any specific patch number!
* now close the terminal, and reopen it.
* if you enter: `node -v`
  * you should see something similar to: `v0.10.29`
  * if you see something else like: `node: command not found`
    * something has gone wrong with your nvm installation,
      go back and check you step

That's all!

### Look ma, no `sudo`!

Now whenever you do a global installation,
you need not use `sudo`,
because NodeJs is installed in a subdirectory of your home directory,
which doesn't require `sudo` access to write files.


```bash
npm install --global npm
```

This should install `npm` in the global `node_modules` directory,
without a hitch.

#### Caveat

If you have previously installed NodeJs using another method,
and have used `sudo npm ...` commands before,
you might still run into problems,
where global installations without `sudo` continue to fail.

The first action you should take, to overcome this, is to find where
the previous installation was located and delete it.

The second action you should take, is to find a directory in your home directory,
named `.npm`, and ensure that the `root` user does not own any of those files.
The following command should help you with that.

```bash
sudo chown -R $( whomami ) ~/.npm
```

## Conclusion

If you are using Linux or Mac,
install NodeJs using NVM to save yourself from a lot of headaches!
