---
comments: true
title: Relational databases and JDBC intro
date: '2010-04-12T01:26+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/04/12/relational-databases-and-jdbc/
permalink: /2010/04/12/relational-databases-and-jdbc/
tags: [code, coursework, database, java, learn]
---

<p>How to connect to a relational database from a Java program using Java Database Connectivity (JDBC); the JDBC API; some basic SQL; Object-Relational Mapping -all put together with a code example</p>
<h3>Why JDBC?</h3>
<p>There are a myriad of database vendors, each with their own software and hardware implementations/ requirements, and their won API: PostgreSQL, mySQL, Oracle, to name a few. In java, there are two main ways to connect to these databases, with Persistence, or with JDBC, and we will be only looking at the latter.</p>
<p>JDBC allows a standard Java application (J2SE) application to communicate with a relational database management system (RDBMS). Like anything else in Java, the programmer uses it by adding a library containing the relevant classes to the class path, and then invoking its API. JDBC acts as a bridge between your java application running from within a Java Virtual Machine (JVM) and a RDBMS running on the native operating system, and provides a pure Java API for database access. The cross platform nature of both Java and JDBC make the Java programmer quite powerful, as he can write the application just once and expect it to work, with minimal need to change the code, for databases from any vendor* and on any platform.</p>
<p>Of course, in order to make access to any database possible through a standard API, the database vendors themselves must conform to a set of standards themselves, and JDBC provides a Service Provider Interface (SPI) that the vendor must implement or conform to. Unless you are a developer for a a database vendor, you will not ever have to worry about JDBC&#8217;s SPI. In essence, the Java program talks to the JDBC driver manager, which then translates and relays the message on to the database&#8217;s drivers.</p>
<p>Using JDBC, Java programs are able to achieve the classic <a href="http://www.linuxjournal.com/article/3508" title="Linux Journal on Client-Server architecture and three-tier architecture" target="_blank">client-server architecture</a> or <a href="http://en.kioskea.net/contents/cs/cs3tier.php3" title="Kioskea on Client-Server architecture and three-tier architecture" target="_blank">three-tier architecture</a>. Also, see my previous <a href="/2010/04/12/java-socket-programming-intro/" title="Java socket programming intro" target="_blank">post on socket programming in java</a>.</p>
<h3>Object Relational Mapping</h3>
<p>Objects are the lingua franca of Java programming (and any other OO language). Databases traditionally are about relations &#8211; they talk in tables and records. Therefore, unless the database you are talking to is an object database, you will need to do object relational mapping (ORM). That is after reading a record from a table, to transform them into an Object; or prior to writing a record to a table, to construct a record from the Object. Fortunately parallels exist between the object world and the relational world that make these mappings, for the most part**, intuitive.</p>
<ul>
<li> Relational &lt;&#8211;&gt; Object</li>
<li> Table &lt;&#8211;&gt; Class</li>
<li> Column &lt;&#8211;&gt; Attribute</li>
<li> Row &lt;&#8211;&gt; Instance (of an Object)</li>
<li> Foreign Key &lt;&#8211;&gt; Object reference member variable</li>
</ul>
<h3>Coding with JDBC API</h3>
<ul>
<li> Plugging your Java program into a JDBC driver &#8211; seven quick steps</li>
<li> Start the database server.</li>
<li> Add the JDBC&#8217;s driver library (usually one or more JAR files) to the class path</li>
<li> Load the class of the JDBC driver&#8217;s entry point using ClassLoader</li>
<li> Create a statement or a prepared statement</li>
<li> Execute a query or update via the statement or prepared statement</li>
<li> Catch and handle SQL Exception</li>
<li> Finally, close the statement and close the connection</li>
</ul>
<p>For this demo, we will use the apache derby JDBC driver and Java DB database, since that is developed by Sun and ships with Netbeans, and therefore requires minimal set up and configuration effort.</p>
<h4>Setup</h4>
<p>To start the database server in Netbeans, go to the services tab, select</p>
<pre>Databases --&gt; Java DB --&gt; (right click) --&gt; Start Server.</pre>
<p>Easy as pie &#8211; this will be more complex if you want to use another vendor&#8217;s database. You will of course, need a database instance to connect to, and if you do not already have one, right click on &#8220;Java DB&#8221; again and select &#8220;Create Database&#8221;. Give it a name, and create a user name and password to access it with. Note these down, as you will need them later. You will now see an entry that looks similar to:</p>
<pre>jdbc:derby://localhost:1527/yourDBname</pre>
<p>Note this down as well.</p>
<p>To add the JDBC driver&#8217;s library in Netbeans, go to the projects tab, right click on your project and select &#8220;Properties&#8221;. In the project properties window, select &#8220;Libraries&#8221;, then &#8220;Add Library&#8221;. Select the apache derby library, if it already exists, or create a new one (the JAR files are found in the Sun SDK installation directory ./javadb/lib).</p>
<p>Now create a new class for in your project that intends to handle the JDBC access functionality. In its constructor, load the JDBC driver using ClassLoader by doing</p>
<pre class="brush: java; title: ; notranslate" title="">
Class.forName(&quot;org.apache.derby.jdbc.ClientDriver&quot;);
</pre>
<p>Note that we discard the return value of the forName method, because we do not need the actual class. We just want the ClientDriver class to be loaded into the JVM. In addition, we should handle the exception &#8211; this exception should never occur unless the JDBC driver&#8217;s library has not been added properly.</p>
<pre class="brush: java; title: ; notranslate" title="">
try {
Class.forName(&quot;org.apache.derby.jdbc.ClientDriver&quot;);
} catch (ClassNotFoundException cnfe) {
//exception handling code
}
</pre>
<p>Before we delve into creating SQL queries, we should enable this class to connect to the database.<br />
Define the following static constants for this class, replacing &#8220;myDatabase&#8221;, &#8220;myUname&#8221; and &#8220;myPword&#8221; with the actual values noted down previously.</p>
<pre class="brush: java; title: ; notranslate" title="">
private static final String DB_URL = &quot;jdbc:derby://localhost:1527/myDatabase&quot;;
private static final String DB_USERNAME = &quot;myUname&quot;;
private static final String DB_PASSWORD = &quot;myPword&quot;;
</pre>
<p>Now create a method that connect to the database and then returns the connection. This method is intended to be commonly used by several other methods that perform the database access.</p>
<pre class="brush: java; title: ; notranslate" title="">
    /**
     * Utility method returns a database connection using the specified settings
     * @return Connection to the database
     */
    private Connection getDbConnection() {
        try {
            Connection dbCon = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            return dbCon;
        } catch (SQLException ex) {
            System.err.println(&quot;Failed to create connection&quot;);
            return null;
        }
    }
</pre>
<h4>CRUD</h4>
<p>The actual legwork of this class is to perform create, read, update and delete operations, also known as CRUD. We will implement one of each of the CRUD operations that act on a single object/ single record, as well as just a read operation that returns the entire set of objects/ records.</p>
<pre class="brush: java; title: ; notranslate" title="">
public void addProperty(Property property) throws SQLException
{
//code goes here
}

public void removeProperty(String id) throws SQLException
{
//code goes here
}

public void editProperty(Property property) throws SQLException
{
//code goes here
}

public Property searchProperty(String id) throws SQLException
{
//code goes here
}

public List
searchAllProperties() throws SQLException
{
//code goes here
}
</pre>
<h4>Create, Update and Delete</h4>
<p>Now for each of the operations, we should prepare a statement, execute the query or update, and then close the resources and handle the exceptions.</p>
<pre class="brush: java; title: ; notranslate" title="">
        Connection dbCon = null;
        PreparedStatement ps = null;
        try {
            dbCon = getDbConnection();
            ps = dbCon.prepareStatement(&quot;INSERT INTO property VALUES ( ? , ? , ?)&quot;);
            ps.setString(1, property.getPropertyId());
            ps.setString(2, property.getAddress());
            ps.setDouble(3, property.getPrice());

            int affectedRows = ps.executeUpdate();
            if (affectedRows != 1) {
                System.err.println(&quot;Failed to update: Number of affected rows = &quot; + affectedRows);
            }
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (dbCon != null) {
                dbCon.close();
            }
        }
</pre>
<p>After obtaining a Connection, we can prepare a PreparedStatement. The Connection#prepareStatment(String) method take one argument, which is an SQL query, with the actual values omitted and their places marked with questions marks (&#8220;?&#8221;). After this, we prepare this statement by substituting the values in place of the question marks, using the PreparedStatement#setX(int, X) method. There are a couple of gotchas to be aware of when doing this:</p>
<ul>
<li>In Java, and in most programming, almost everything is zero-indexed. However, in prepared statements, the first question mark has an index of 1, and we need to keep this in mind.</li>
<li>In SQL, strings need to be surrounded by quotes. As such, it might be natural to surround the first two question marks above with quote. However, this is not necessary &#8211; when using the PreparedStatement#setString(int, String) method, you are already telling the database to expect a string, and thus quotes are made redundant (and cause errors if used).</li>
</ul>
<p>Next, we execute the update, in this case an Create operation, by invoking PreparedStatement#executeUpdate(). We use the return value, which indicates the number of affected rows, to determine whether the update has been successful.</p>
<p>In this case, we choose to have the exceptions handled by the invoking method or class &#8211; that is why each of the CRUD operation methods advertises that they throw SQLExceptions. However, these methods should still close the resources used (the database connection and prepared statement). </p>
<p>Therefore all the statements in the method are put in a try block without a catch block and with a finally block. We close these resources in the finally block, first checking that they are not null as they may never have been initialised, depending on where the exception occurred.</p>
<h4>Read</h4>
<p>The above template may be trivially modified to work for the Update and Delete operations as well. However, Read operations are fundamentally different; because the flow of information is in the opposite direction than it was in Create, Update and Delete statements. As a result, ORM occurs in the opposite direction, and also, instead of PreparedStatement#executeUpdate(), we will use PreparedStatement#executeQuery().</p>
<pre class="brush: java; title: ; notranslate" title="">
    public List&lt;Property&gt; searchAllProperties() throws Exception {
        Connection dbCon = null;
        PreparedStatement ps = null;
        try {
            dbCon = getDbConnection();
            ps = dbCon.prepareStatement(&quot;SELECT * FROM property&quot;);
            List&lt;Property&gt; pptys = new ArrayList&lt;Property&gt;();

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String id = rs.getString(&quot;PROPERTY_ID&quot;);
                String address = rs.getString(&quot;ADDRESS&quot;);
                double price = rs.getDouble(&quot;PRICE&quot;);
                Property ppty = new Property(id, address, price);
                pptys.add(ppty);
            }
            return pptys;
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (dbCon != null) {
                dbCon.close();
            }
        }
    }
</pre>
<p>Unlike PreparedStatement#executeUpdate(), which returns an integer, PreparedStatement#executeQuery() returns a ResultSet object. The ResultSet object can be used/ manipulated in a manner similar to an iterator (although it technically is not an iterator). Use ResultSet#next() to go to the next row, and ResultSet#getX(String) to get the value of an attribute in the named column for the current row.</p>
<p>We can observe the opposite direction of the ORM by comparing this from the Create method:</p>
<pre class="brush: java; title: ; notranslate" title="">
ps.setString(1, property.getPropertyId());
</pre>
<p>to this from the Read method:</p>
<pre class="brush: java; title: ; notranslate" title="">
String id = rs.getString(&quot;PROPERTY_ID&quot;);
</pre>
<p>Notes:<br />
* Provided the vendor is JDBC compliant, and most of the major database vendors are. At time of writing, they number 221. <a href="http://developers.sun.com/product/jdbc/drivers" title="JDBC Drivers" target="_blank">JDBC Drivers</a> provides a full, and searchable, list.</p>
<p>** There are indeed some grey areas, both conceptually and in physical implementation. For example, what happens to static members of classes? What happens to foreign keys that are a combination of multiple primary keys? How are SQL dates mapped to Java date and time objects? There are answers to these, but they are not exactly intuitive.</p>
