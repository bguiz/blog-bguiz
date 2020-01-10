---
comments: true
title: Client-side deployment with applets and JNLP
date: '2010-04-12T01:44+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/12/client-side-deployment/
permalink: /2010/04/12/client-side-deployment/
tags: [applets, code, coursework, java, learn]
---

<p>In the previous posts, on <a title="Java socket programming intro" href="/2010/04/12/java-socket-programming-intro/" target="_blank">socket programming</a> and <a title="Relational databases and JDBC" href="/2010/04/12/relational-databases-and-jdbc/" target="_blank">JDBC</a>, the focus has been on programming for the server. This post will focus on client-side programming: applets and web start &#8211; with particular focus on the latter.</p>
<h3>Java Web Start</h3>
<p>The Java Network Launch Protocol (JNLP) specifies how to deliver a desktop application over the internet. A webpage may link to a *.jnlp file, and when you download it, the JVM is invoked and will parse the file and download or stream the Java classes of the application, and run the application as if it were on your desktop (not within the browser).</p>
<p>Sun has a full-blown <a title="Sun tutorial: deploying java web start applications" href="http://java.sun.com/docs/books/tutorial/deployment/webstart/index.html" target="_blank">tutorial on how to develop, deploy and run Java Web Start applications</a> &#8211; it is a significantly trickier task to accomplish than with standard JAR file distributions; and rightly so, because applications deployed over networks need tighter security at several different levels.</p>
<p>By default, Java applications deployed or running over networks, including Java web start applications, are sandboxed by the security manager of the JVM. A sandbox may be thought of as a restricted environment. This means that the instruction set they are allowed to use is severely restricted such that only completely harmless operations are permitted. For these applications to gain more access rights on the local machine (the client machine on which it is deployed or running), the JAR files need to be digitally signed. Again, the Sun tutorial has a <a title="Sun tutorial: Digitally signing JAR files" href="http://java.sun.com/docs/books/tutorial/deployment/webstart/security.html" target="_blank">detailed explanation</a> about what this involves. Some of the restrictions include:</p>
<ul>
<li> Cannot I/O to local files or execute them</li>
<li> Can only phone home to the host from which it was downloaded &#8211; not to other clients or servers</li>
<li> Warning messages displayed to user</li>
</ul>
<h3>Applets</h3>
<p>Applets are another means to run remote code on a client machine. They differ significantly from the Java Webs Start because they do not run as a desktop application, but rather via a browser plug in.</p>
<p>JApplet is a Swing component; however it inherits from neither JComponent nor JFrame. Instead, it inherits from Applet, which is an AWT component.</p>
<h4>Deploying an applet on a web page</h4>
<p><a title="W3.org's object tag definition" href="http://www.w3.org/TR/REC-html40/struct/objects.html#h-13.4" target="_blank">W3.org&#8217;s ﻿&lt;object&gt;  ﻿﻿tag definition</a> | <a title="Sun tutorial on Applets" href="http://java.sun.com/docs/books/tutorial/deployment/applet/" target="_blank"> Sun tutorial on Applets</a></p>
<p>The Sun tutorial and the W3.org specification disagree at the time of writing &#8211; the Sun tutorial still is uses the &lt;applet&gt; tag, whereas the W3.org specification says that the &lt;applet&gt; tag has been deprecated in favour of the object tag. The &lt;applet&gt; still tag works on all Java enabled browsers, and it is not too much effort to switch from one to the other &#8211; the commonly used attributes are almost identical. In the examples below, the only difference is that the &#8220;code&#8221; attribute is replaced by the &#8220;classid&#8221; attribute&#8221;.</p>
<p>Using the applet tag:</p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;applet code=&quot;some.package.MyApplet&quot;
   archive=&quot;dist/myApp.jar&quot;
   width=&quot;400px&quot; height=&quot;300px&quot;&gt;
      &lt;param name=&quot;myString1&quot; value=&quot;myValue1&quot; /&gt;
      &lt;param name=&quot;myDouble2&quot; value=&quot;2.0&quot; /&gt;
&lt;/applet&gt;
</pre>
<p>Using the object tag:</p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;object classid=&quot;some.package.MyApplet&quot;
   archive=&quot;dist/myApp.jar&quot;
   width=&quot;400px&quot; height=&quot;300px&quot;&gt;
      &lt;param name=&quot;myString1&quot; value=&quot;myValue1&quot; /&gt;
      &lt;param name=&quot;myDouble2&quot; value=&quot;2.0&quot; /&gt;
&lt;/object&gt;
</pre>
<h4>Java applet code</h4>
<p>Before jumping into coding the applet, it is a good idea to think about JApplet&#8217;s inheritance hierarchy. Because it inherits from neither JComponent nor JFrame, it will be missing some API (such as setTitle(String), and setSize(int, int)), and behave differently. A word of caution also that JApplet has some interesting painting and layout quirks, thus as a rule of thumb, avoid doing any GUI design work directly inside of an applet &#8211; instead do all the GUI design work in a JPanel, and then put the JPanel inside the JApplet.<br />
Another important distinction to make is the entry point into a standard Java application is different from the entry point into a Java applet. A standard Java application always needs (at least) one class that contains the special method with the signature:</p>
<pre class="brush: java; title: ; notranslate" title="">public static void main (String[] args)</pre>
<p>This is its entry point, and any command line arguments get passed in via the string array. However, in the applet, there is no &#8220;main&#8221; method, and certainly no array of strings for command line arguments. However, the same effect is achieved using the init() method of the applet, and the parameters passed in using the &lt;param&gt; tags within the &lt;applet&gt; or &lt;object&gt; tags.</p>
<pre class="brush: java; title: ; notranslate" title="">
public class MyApplet extends JApplet {
   private String myString1;
   private double myDouble2;
   public void init() {
      myString1 = getParameter(&quot;myString1&quot;);
      myDouble2 = Double.parseDouble(getParameter(&quot;myDouble2&quot;));
   }
}
</pre>
<p>Once this is done, you can do anything with an applet that you can with any other java application. Note that the same security restrictions still apply to code that is deployed over a network &#8211; the applets can be sandboxed.</p>
<h4>Applets&#8217; external communications</h4>
<p>Applets can communicate with other applets, the browser, and any other machine through sockets. However, if the applet is sandboxed, its socket communications will be restricted to only the host machine they originate from.<br />
Applets communicate with other machines through sockets, in the same way that a standard Java application does. See my previous <a title="Java socket programming intro" href="/2010/04/12/java-socket-programming-intro/" target="_blank">post on socket programming in java</a> for more details.</p>
<p>Applets can communicate with other applets running in the same environment (which in most cases are the other applets in the same web page). They do this through the AppletContext interface. In order to do this, each applet must have a name. This is not a class name, but a unique ID for each applet within the web page. To do this, just add a &#8220;name&#8221; attribute to each of the &lt;applet&gt; tags or &lt;object&gt; tags.</p>
<pre class="brush: java; title: ; notranslate" title="">
       Applet receiver = getAppletContext().getApplet(&quot;myApplet2&quot;);
       if ((receiver != null) &amp;&amp; (receiver instanceof MyApplet)) {
           ((MyApplet)receiver).sendMessage(message);
       } else {
           System.err.println(&quot;The other applet was not found&quot;);
       }
</pre>
<p>The code above shows how one applet obtains the AppletContext, and uses this to obtain a reference to another applet on the same web page, whose name attribute is &#8220;myApplet2&#8243;. If such an applet is found, it type casts it to a particular class of Applet (in this case MyApplet), so that it may invoke a method particular to his type of applet &#8211; the sendMessage(String) method, which it uses to transmit the contents of the &#8220;message&#8221; variable. Thus, intra-web page applet communication is achieved.</p>
<p>Applets can also communicate with the browser. This is also achieved via the AppletContext interface. Invoke the AppletContext#showDocument(URL) method to tell the browser to navigate to a new location. Invoke the AppletContext#showStatus(String) method to change the text in the status bar of the browser.</p>
<pre class="brush: java; title: ; notranslate" title="">
       Applet receiver = getAppletContext().getApplet(&quot;myApplet2&quot;);
       if ((receiver != null) &amp;&amp; (receiver instanceof MyApplet)) {
       ((MyApplet)receiver).sendMessage(message);
       } else {
           System.err.println(&quot;The other applet was not found&quot;);
       }
</pre>
