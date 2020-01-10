---
comments: true
title: Python iView on Ubuntu
date: '2010-05-21T07:42+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/05/21/python-iview-on-ubuntu/
permalink: /2010/05/21/python-iview-on-ubuntu/
tags: [howto, iview, linux, python, rtmpdump]
---

<p>This is the Ubuntu counterpart to my <a href="/2010/04/01/deploying-python-iview-on-windows/">earlier post about deploying python iView on Windows</a> (<a href="http://jeremy.visser.name/2009/08/30/python-iview/">python iView homepage</a>).</p>
<p>Fortunately, it is much easier than Windows, everything is achieved with a single shell script.</p>
<pre class="brush: bash; title: ; notranslate" title="">
#!/bin/bash
# Installs python-iview including all dependencies
# Script assumes /usr/bin in on the path (is with default installs)
# Brendan Graetz 20100521
#
# python-iview by Jeremy Visser: http://jeremy.visser.name/2009/08/30/python-iview/

#install bazaar and python library
sudo apt-get install bzr
sudo apt-get install python-beautifulsoup

#install dev dependencies in order to be able to compile
sudo apt-get install libssl-dev
sudo apt-get install zlib1g-dev

#download rtmpdump source
wget http://rtmpdump.mplayerhq.hu/download/rtmpdump-2.2d.tgz ~/Downloads/rtmpdump-2.2d.tgz

#compile rtmpdump &amp; create softlink on path
cd /usr/local/
tar -xzf ~/Downloads/rtmpdump-2.2d.tgz
cd rtmpdump-2.2d
make posix
sudo ln -s `pwd`/rtmpdump /usr/bin/rtmpdump

#check out python iview from repository
cd /usr/local/
bzr branch http://jeremy.visser.name/bzr/python-iview/ ./python-iview

#create softlinks on path
sudo ln -s `pwd`/python-iview/iview-gtk /usr/bin/iview-gtk
sudo ln -s `pwd`/python-iview/iview-cli /usr/bin/iview-cli
sudo ln -s /usr/bin/iview-gtk /usr/bin/iview
</pre>
<p>The only somewhat tricky bit here is that you need to compile <a href="http://rtmpdump.mplayerhq.hu/" target="_blank">rtmpdump</a>, because it does not distribute binaries (not <em>.deb</em>&#8216;s anyway). For that you will need to install a couple of dependencies which are not immediately obvious: <em>libssl-dev</em> and <em>zlib1g-dev</em>.</p>
