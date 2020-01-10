---
comments: true
title: Deploying python iView on Windows
date: '2010-04-01T11:59+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/01/deploying-python-iview-on-windows/
permalink: /2010/04/01/deploying-python-iview-on-windows/
tags: [build, howto, iview, python, rtmpdump, windows]
---

<p>I have recently been getting rather annoyed with the streaming problems with ABC&#8217;s iView. It started with intermittent cut outs, and then soon degraded to really bad lags and even audio and video getting out of sync, and playing at half or quarter speed. In a nutshell, it became unwatchable. I complained to the support of my ISP, <a href="http://iinet.net.au">iiNet</a>, however they did not help &#8211; and maybe it isn&#8217;t entirely their fault either. Since streaming was broken, I thought why not buffer the entire program at a time instead, at least until iiNet and ABC fix their servers.</p>
<p>At first I used Yanksy&#8217;s <a href="http://bit.ly/9ZGRhd">iViewFox</a>. However it ran incredibly slowly. So I decided to get Jeremy Visser&#8217;s <a href="http://bit.ly/9EohCw">python iView</a> instead. The problem with that is that while python is theoretically cross platform, it is extremely hard to get working on a non-Linux, non-Mac box, and especially so when the application in question has multiple 3rd party dependencies. Judging from the <a href="http://bit.ly/9EohCw">comments on Jeremy&#8217;s blog</a>, I think no one has managed to get it working on Windows yet, so I am posting a how-to for the benefit of those whose primary machine is a Windows box. Note that this requires your to install nine pieces of software in total to get working, and you need to edit environment variables, etc, so it can take a while.</p>
<p>Full instructions after the jump. Enjoy.</p>
<hr />
<p>&nbsp;</p>
<p>Download and install the following software. The order in which they are installed is somewhat important as some are dependencies of the others.<br />
For each I have provided a link to both the developer&#8217;s page, plus a direct one to the distribution file. I have specified version numbers because not all versions play nice with each other &#8211; for example if your version of python is different, you will need to get different distributions of the python libraries.<br />
Some software does not come with an executable installer and will actually involve manual installation that includes building the software. To do this, you will have to open up a command prompt, change directories to the location where the files are downloaded or uncompressed to, and enter the command lines detailed.<br />
Note that special care has been taken to avoid folder or file names containing spaces &#8211; I use a `programs` folder instead of using the default `Program Files`.</p>
<ol>
<li>- Python<br />
<a href="http://www.python.org/download/releases/2.6.4/">http://www.python.org/download/releases/2.6.4/</a><br />
2.6.4: <a href="http://www.python.org/ftp/python/2.6.4/python-2.6.4.msi">http://www.python.org/ftp/python/2.6.4/python-2.6.4.msi</a><br />
Path should be automatically set, check it anyway</li>
<li>- Bazaar<br />
<a href="http://wiki.bazaar.canonical.com/WindowsDownloads">http://wiki.bazaar.canonical.com/WindowsDownloads</a><br />
2.1.0-2 <a href="http://launchpad.net/bzr/2.1/2.1.0/+download/bzr-2.1.0-2-setup.exe">http://launchpad.net/bzr/2.1/2.1.0/+download/bzr-2.1.0-2-setup.exe</a><br />
Add bazaar to path<br />
Path should be automatically set, check anyway</li>
<li>- PyGTK group<br />
<a href="http://www.pygtk.org/downloads.html">http://www.pygtk.org/downloads.html</a></p>
<ul>
<li>&#8211; PyCairo<br />
<a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pycairo/1.8/1.8.6">http://ftp.gnome.org/pub/GNOME/binaries/win32/pycairo/1.8/1.8.6</a><br />
1.8.6 <a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pycairo/1.8/pycairo-1.8.6.win32-py2.6.exe">http://ftp.gnome.org/pub/GNOME/binaries/win32/pycairo/1.8/pycairo-1.8.6.win32-py2.6.exe</a></li>
<li>&#8211;PyGObject<br />
<a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pygobject/2.20/2.20.0">http://ftp.gnome.org/pub/GNOME/binaries/win32/pygobject/2.20/2.20.0</a><br />
2.20.0 <a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pygobject/2.20/pygobject-2.20.0.win32-py2.6.exe">http://ftp.gnome.org/pub/GNOME/binaries/win32/pygobject/2.20/pygobject-2.20.0.win32-py2.6.exe</a></li>
<li>&#8211;PyGTK<br />
<a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pygtk/2.16/">http://ftp.gnome.org/pub/GNOME/binaries/win32/pygtk/2.16/</a><br />
2.16.0 <a href="http://ftp.gnome.org/pub/GNOME/binaries/win32/pygtk/2.16/pygtk-2.16.0+glade.win32-py2.6.exe">http://ftp.gnome.org/pub/GNOME/binaries/win32/pygtk/2.16/pygtk-2.16.0+glade.win32-py2.6.exe</a></li>
</ul>
</li>
<li>-GTK+<br />
<a href="http://www.gtk.org/download-windows.html#StableRelease">http://www.gtk.org/download-windows.html#StableRelease</a><br />
2.18 <a href="http://ftp.gnome.org/pub/gnome/binaries/win32/gtk+/2.18/gtk+-bundle_2.18.7-20100213_win32.zip">http://ftp.gnome.org/pub/gnome/binaries/win32/gtk+/2.18/gtk+-bundle_2.18.7-20100213_win32.zip</a><br />
Simply extract folder to disk<br />
Path must be manually set</li>
<li>-RTMP dump<br />
<a href="http://rtmpdump.mplayerhq.hu/download/">http://rtmpdump.mplayerhq.hu/download/</a><br />
2.1d <a href="http://rtmpdump.mplayerhq.hu/download/rtmpdump-2.1d-windows.zip">http://rtmpdump.mplayerhq.hu/download/rtmpdump-2.1d-windows.zip</a><br />
Simply extract the folder to disk<br />
Path must be manually set</li>
<li>-Beautiful Soup<br />
<a href="http://www.crummy.com/software/BeautifulSoup/3.0.8">http://www.crummy.com/software/BeautifulSoup/3.0.8</a><br />
3.0.8 <a href="http://www.crummy.com/software/BeautifulSoup/download/3.x/BeautifulSoup-3.0.8.tar.gz">http://www.crummy.com/software/BeautifulSoup/download/3.x/BeautifulSoup-3.0.8.tar.gz</a></p>
<pre class="brush: powershell; title: ; notranslate" title="">
python setup.py bdist
dist/BeautifulSoup-3.0.8.win32.exe
</pre>
</li>
<li>-Python iView<br />
<a href="http://jeremy.visser.name/2009/08/30/python-iview/">http://jeremy.visser.name/2009/08/30/python-iview/</a><br />
revision 341</p>
<pre class="brush: powershell; title: ; notranslate" title="">
cd C:\Programs
bzr branch http://jeremy.visser.name/bzr/python-iview/python-iview
notepad setup.py
REM edit to remove the slashes that precede `usr` (2X)
python setup.py bdist
dist/iview-0.2.win32.exe
</pre>
</li>
<li>Edit the environment variable, `path` to add or update these values:
<pre class="brush: powershell; title: ; notranslate" title="">
C:\Programs\python264;
C:\Programs\Bazaar;
C:\Programs\gtk\bin;
C:\Programs\rtmpdump-2.1d
</pre>
<p>These values must be added to the `path`. If they are already there, or a point to previous version, just make sure you update them to point to the new one &#8211; pointing to both is problematic. If you installed in a  different location, change accordingly.</li>
<li>Run python iview
<pre class="brush: powershell; title: ; notranslate" title="">
python iview-gtk
python iview-cli
</pre>
<p>These files are actually python files, not compiled executables. They may be executed directly in *nix systems because the first line is</p>
<pre class="brush: bash; title: ; notranslate" title="">#!/usr/bin/env python</pre>
<p>However, that obviously is not understood by Windows, so you will need to precede the name of the file with `python` to tell Windows to execute it using python.</li>
</ol>
<p>Voila!</p>
