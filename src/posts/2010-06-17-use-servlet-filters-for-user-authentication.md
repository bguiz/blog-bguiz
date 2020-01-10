---
comments: true
title: Using servlet filters for user authentication
date: '2010-06-17T11:22+11:00'
originalUrl: http://brendangraetz.wordpress.com/2010/06/17/use-servlet-filters-for-user-authentication/
permalink: /2010/06/17/use-servlet-filters-for-user-authentication/
tags: [authentication, code, filter, http, java, java-ee, jsp, mvc, security, servlet]
---

<p>When creating a Java web application that requires access restrictions on some pages, one way to do it is to include user authentication logic within each JSP, or perhaps in a JSP fragment that is included in all of these JSPs. In that code perform a redirect or forward to an access denied page.</p>
<pre class="brush: java; title: ; notranslate" title="">
req.getRequestDispatcher(&quot;/accessDenied.html&quot;).forward(request, response);
</pre>
<p>However, a Java web container is multi-threaded, and this merely spawns a new thread, and the server processes both the JSP and the page that has been forwarded to simultaneously. If one looks at the logging output from the server, or intercepts the HTTP traffic, using, for example, a packet sniffer (which are commonplace enough to exist as <a href="http://livehttpheaders.mozdev.org/" target="_blank">Firefox extensions</a>), one can see this happening live. This method therefore, clearly raises some nasty security concerns.</p>
<p>Furthermore, from a software engineering or architectural design point of view, using a JSP as a filter violates MVC design principles, as doing so would make the JSP act as a controller as well as a view at the same time.</p>
<p>The proper way to go about implementing restricted access to certain pages is to use filters from the Servlet API, and then configuring the web application to map select pages to these filters. This method utilises additional capability provided by web container that runs on the server. The web container constructs filter chains based on the filter mappings defined. Most crucially, these filters allow the authentication logic and consequent branching to be executed <em>prior to</em> the JSP being called;</p>
<p>Create an abstract class `LoginFilter`.</p>
<pre class="brush: java; title: ; notranslate" title="">
    public abstract class LoginFilter implements javax.servlet.Filter {
        protected ServletContext servletContext

        public void init(FilterConfig filterConfig) {
            servletContext = filterConfig.getServletContext();
        }

        public void doFilter(
            ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
            HttpServletRequest req = (HttpServletRequest)request;
            HttpServletResponse resp = (HttpServletResponse)response;

            if (!isAuth()) {
                resp.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                return; //break filter chain, requested JSP/servlet will not be executed
            }

            //propagate to next element in the filter chain, ultimately JSP/ servlet gets executed
            chain.doFilter(request, response);
        }

        /**
         * logic to accept or reject access to the page, check log in status
         * @return true when authentication is deemed valid
         */
        protected abstract boolean isAuth();

    }
</pre>
<p>Subclass the `LoginFilter` as a concrete class, `MemberLoginFilter`, by implementing the `isAuth` method. In this case add logic that determines whether a user is currently logged in. This post does not cover how this is done; in a nutshell, this would typically involve retrieving objects from the current HTTP session, and determining whether a user has logged in during the current session by comparing the values or states of these objects.</p>
<p>Now edit the `web.xml` configuration for the web application archive (WAR), to make the web app aware of the filter and what pages it should map to.</p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;filter&gt;
    &lt;description&gt;Requires user to log in as a member&lt;/description&gt;
    &lt;filter-name&gt;MemberLoginFilter&lt;/filter-name&gt;
    &lt;filter-class&gt;some.package.MemberLoginFilter&lt;/filter-class&gt;
&lt;/filter&gt;
&lt;filter-mapping&gt;
    &lt;filter-name&gt;MemberLoginFilter&lt;/filter-name&gt;
    &lt;url-pattern&gt;/someRestrictedPage.jsp&lt;/url-pattern&gt;
&lt;/filter-mapping&gt;
</pre>
<p>Add as many filter mappings as necessary for each page that needs to have access to it restricted to logged-in members only; use file name globs to match multiple files.</p>
<p>Also, still editing `web.xml` configuration, tell the web app how to handle access denied error messages in a more user friendly way, by adding the following node to the settings:</p>
<pre class="brush: xml; title: ; notranslate" title="">
&lt;error-page&gt;
    &lt;error-code&gt;401&lt;/error-code&gt;
    &lt;location&gt;/accessDenied.html&lt;/location&gt;
&lt;/error-page&gt;
</pre>
<p>The HTTP 401 error code referenced here corresponds to `HttpServletResponse.SC_UNAUTHORIZED` in `LoginFilter.doFilter(..)`.<br />
This completes the loop: when the filter chain is broken because `LoginFilter.isAuth()` returns false, instead of getting a garish HTTP 401, the user will see an access denied page instead, which you can edit to inlcude a user friendly message.</p>
<p>If `LoginFilter.isAuth()` returns true, the filter chain continues execution, and assuming that there are no more filters in the filter chain, or all of the downstream filters in the filter chain pass, the requested JSP or servlet gets displayed.</p>
