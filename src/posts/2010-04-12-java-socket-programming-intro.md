---
comments: true
title: Java socket programming intro
date: '2010-04-12T12:57+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/12/java-socket-programming-intro/
permalink: /2010/04/12/java-socket-programming-intro/
tags: [code, java, learn, sockets]
---

<p>Here is a quick introduction to socket programming in Java &#8211; using a simple demonstration of client-server communication. For the purposes of the demonstration, both the client and the server will be on the same physical machine (&#8220;localhost&#8221;). However, this can be easily changed later on.</p>
<p>Create two classes, one named &#8220;SocketsDemoClient&#8221; for the client, and another named &#8220;SocketsDemoServer&#8221; for the server.</p>
<h3>The server class</h3>
<p>Create some default values for the port number (no need to to define host name on the server &#8211; it is always the local machine). Also, define the main method which gets executed when running this class.</p>
<pre class="brush: java; title: ; notranslate" title="">
    private int DEFAULT_PORT = 9999;

    public static void main(String[] args) {
        SocketsDemoServer server = new SocketsDemoServer();
        server.serverLoop();
    }
</pre>
<p>Create the server loop method that does all the heavy lifting in this class. Now, we simply define the objects that will be used as local variables and create an infinite while loop.</p>
<pre class="brush: java; title: ; notranslate" title="">
    public void serverLoop() {
        try {
            // create a server socket with the default port number
            ServerSocket serverSocket = new ServerSocket(DEFAULT_PORT);
            Socket sck;
            BufferedReader inStream;
            PrintWriter outStream;
            String input, reply;
            while (true) {
                //code will go here later
            }
        }
        catch (IOException ioex)
        {
            System.err.println(&quot;IO exception occurred in the server loop:&quot;);
            ioex.printStackTrace();
        }
</pre>
<p>Inside this loop, we want to do several things: accept a socket connection, read information from the socket (written by the client), do some processing, and finally write a return message or reply to the socket (to be read by the client).<br />
Accept a socket connection. Note that ServerSocket#accept() cause the execution to pause until client communicates with the server. The accepted Socket provides the low-level IO streams for this client-server communication, which we then will need to wrap with our own high-level IO stream for more intuitive or meaningful manipulation.</p>
<pre class="brush: java; title: ; notranslate" title="">
                sck = serverSocket.accept();
                System.out.println(&quot;Client socket on server side: &quot; + Integer.toHexString(sck.hashCode())); //print some debug info
                inStream = new BufferedReader(new InputStreamReader(sck.getInputStream()));
                outStream = new PrintWriter(sck.getOutputStream(), true);
</pre>
<p>We now read the input that was sent by the client from the socket and process it. In this case, the reply is merely some simple string manipulation performed on the input. However, in a real application this is likely to be something more useful, such as performing a database query.</p>
<pre class="brush: java; title: ; notranslate" title="">
                input = inStream.readLine();
                System.out.println(&quot;Server RCV: &quot; + input);
                reply = &quot;\&quot;&quot; + input.toUpperCase().replaceAll(&quot;[AEIOU]&quot;, &quot;#&quot;) + &quot;\&quot;&quot;;
</pre>
<p>We then send the reply to the client through the same socket, and then close the socket. After this, the execution will loop back, starts over, and will wait for another socket connection.</p>
<pre class="brush: java; title: ; notranslate" title="">
                outStream.println(reply);
                System.out.println(&quot;Server SND: &quot; + reply);
                sck.close();
</pre>
<h3>The client class</h3>
<p>Now if you run the server, you will find that absolutely nothing happens. This is because the execution will stop at &#8220;serverSocket.accept()&#8221;, and then just wait there for an incoming socket connection. The client provides this incoming socket connection. While the client is usually a different machine than the server, in this demonstration they will be the same.</p>
<p>Declare the default values for the host name and the port number. The host name should match the host that the server class is running on. The port number must match the port number that is used by the ServerSocket in the server class. If you wish to run the client on a different machine than the server, simply change the value of &#8220;DEFAULT_HOST&#8221; from &#8220;localhost&#8221; to the relevant host name.<br />
Also, create a main method to define what should be executed when this class is executed. Here the main method will attempt to send the server two messages and then exit.</p>
<pre class="brush: java; title: ; notranslate" title="">
    private String DEFAULT_HOST = &quot;localhost&quot;;
    private int DEFAULT_PORT = 9999;
    public static void main (String[] args)
    {
        SocketsDemoClient client = new SocketsDemoClient();
        client.clientAction(&quot;Hello world&quot;);
        client.clientAction(&quot;The quick brown fox jumps over the lazy dog&quot;);
    }
</pre>
<p>We should now define the client action method used above. Here we want to do several things: create a socket for communicating with the server, send a message to the server, and then receive the reply from the server.<br />
Note that using sockets or server sockets can potentially cause IO exceptions, so these must be caught and handled. Here, only a rudimentary handling is provided by printing the stack trace and allowing the rest of the execution to go on.</p>
<pre class="brush: java; title: ; notranslate" title="">
    public void clientAction(String message) {
        try {
            //rest of code goes here
        }
        catch (IOException ioex)
        {
            System.err.println(&quot;IO exception occured in the client action:&quot;);
            ioex.printStackTrace();
        }
    }
</pre>
<p>Create the socket. The socket will, as in the server class, provide the low-level IO streams, which we wrap in high-level IO streams.</p>
<pre class="brush: java; title: ; notranslate" title="">
            Socket socket = new Socket(InetAddress.getByName(DEFAULT_HOST), DEFAULT_PORT);
            System.out.println(&quot;Client socket on client side: &quot; + Integer.toHexString(socket.hashCode())); //print debug info
            PrintWriter outStream = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader inStream = new BufferedReader(new InputStreamReader(socket.getInputStream()));
</pre>
<p>Send the server a message via the socket.</p>
<pre class="brush: java; title: ; notranslate" title="">
            outStream.println(message);
            System.out.println(&quot;Client SND: &quot; + message);
</pre>
<p>Read the reply from the server, and do something with it &#8211; in this case simply print it.</p>
<pre class="brush: java; title: ; notranslate" title="">
            String reply = inStream.readLine();
            if (reply != null) {
                System.out.println(&quot;Client RCV: &quot; + reply);
            }
</pre>
<p>Close the socket once we are done with it. Note that after closing the socket that there is no loop back. This sequence of actions only gets executed once each time the method is called. This is the major difference between the client and the server: The server just executes continuously, waiting (listening) for the next connection right after processing the last, whereas the client connects as-and-when.</p>
<pre class="brush: java; title: ; notranslate" title="">
            socket.close();
</pre>
<h3>Putting it all together</h3>
<p>Now, run the server class, and notice that still nothing happens. Leave it running, and in a separate shell run the client class. Then both of the process will do something:</p>
<p>You should see this as the output from the client:</p>
<pre class="brush: bash; title: ; notranslate" title="">
Client socket on client side: 41e81f
Client SND: Hello world
Client RCV: &quot;H#LL# W#RLD&quot;
Client socket on client side: 8304c1
Client SND: The quick brown fox jumps over the lazy dog
Client RCV: &quot;TH# Q##CK BR#WN F#X J#MPS #V#R TH# L#ZY D#G&quot;
</pre>
<p>&#8230; and this output from the server:</p>
<pre class="brush: bash; title: ; notranslate" title="">
Client socket on server side: 199dd1
Server RCV: Hello world
Server SND: &quot;H#LL# W#RLD&quot;
Client socket on server side: c90513
Server RCV: The quick brown fox jumps of the lazy dog
Server SND: &quot;TH# Q##CK BR#WN F#X J#MPS #V#R TH# L#ZY D#G&quot;
</pre>
<h3>Notes</h3>
<p>Some things to note are that socket communication is a very low-level means of communicating across networks. There are other high-level means available as well, but somewhere down the line, they all eventually make use socket communication.<br />
Additionally, these example have been simplified to the point that they have little real application, as several limitations have not been addressed. The most obvious one here is that these classes would work well for a single client. However, in actual applications, several clients may attempt to communicate with the server simultaneously. This can be achieved by processing each communication in a different thread, and may be taken further by creating a thread pool to limit resource usage.</p>
