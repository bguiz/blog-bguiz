# Chrome Dev Tools

How to use your browser effectively for web development

=SLIDE=

## Open DevTools

`Ctrl+Shift+C`

`Command+Shift+C`

`Right-click → Inspect Element`

=SPEAKERNOTES=

## Open chrome dev tools

`Ctrl+Shift+C` or `Ctrl+F12`

Or, right-click on any element in a web page,
and select "Inspect Element" from the drop down menu.

=SLIDE=

## Elements Pane

- Inspect Element
  - Live edit DOM
- Inspect CSS
  - Live edit rules
  - Link to sources
  - Colours
  - Forcing pseudo classes
  - Box model

=SPEAKERNOTES=

## Elements Pane

At the top of the "Dev Tools" pane,
you will see a series of tabs.
The first of these is the "Elements" tab.
It is usually selected by default
when you first open up the pane.

On the left you see the DOM inspector.

On the right you see the CSS inspector.

=SUBSLIDE=

### Inspect element

=SPEAKERNOTES=

### Inspect element

The DOM is a tree-like structure of all the elements that your web page is made up of.

To jump to s particular point within the DOM,
you right-click on any element in a web page,
and select "Inspect Element" from the drop-down menu.
This will expand the DOM tree to where the element is.

This DOM tree is a live representation of the document.
Meaning that if you change it,
the page that is rendered will update to reflect those changes.
Right click on any element within the DOM tree and pick "Edit as HTML",
and make whatever changes you like to it.
When it loses focus, the changes are made,
and you should see the updated element displayed in the web page.
You can use any of the other options, such as "Add ATrribute" or "Edit Attribute".
You can even drag and drop the elements around, and delete them.

=SUBSLIDE=

### Inspect CSS

=SPEAKERNOTES=

### Inspect CSS

When you have any element selected in the DOM tree within the Elements panel,
the CSS panel will update to display the styles for that element.

This works in a manner very similar to the the DOM tree,
in that it is a live representation of the document's styles too.
So when you change it, those changes get reflected in the web page immediately.

The other thing worth noting is that CSS styles that are applied to any one element
are actually sourced from potentially multiple CSS files,
and if so the order is quite important.
The styles view shows you not only what the styles are,
but also which specific CSS file and line number they come from.

If you click on the check boxes next to each line of CSS,
you can toggle the individual style rules on and off.
In addition to toggling the existing styles on and off,
you can also edit the values by clicking on them,
and then typing (or selecting) the new value.
You can even add a new line to an existing CSS rule.

These are the basic techniques upon which you can debug your CSS.

To add a completely new rule, click on the `+` icon
at the top right corner of the styles panel.

=SUBSLIDE=

#### Link to sources

=SPEAKERNOTES=

#### Link to sources

For each CSS rule, to the right, there should be a file name,
followed by a `:` and then a line number, all underlined.

If you click on this link,
it opens up the "Sources" pane,
opening the the CSS file in which this rule was defined,
and jumps to the right line number.

=SUBSLIDE=

#### Colours

=SPEAKERNOTES=

#### Colours

When a line in any CSS rule contains a colour,
the text representation of that colour (as found in the CSS file is displayed).
In addition to this, there is also a small box,
filled with that colour.
CLick on this box to reveal a pop up colour selector,
which you can use to select a new colour instead of having to
type the value by hand after looking it up elsewhere.

=SUBSLIDE=

#### Forcing pseudo classes

=SPEAKERNOTES=

#### Forcing pseudo classes

CSS comes with several pseudo classes that allow us to define custom CSS rules
which activate only when the user is interacting with it.
The most common one of these is `:hover`,
which activates only when the mouse is over the element.

We can use the styles panels to force a particular pseudo class to activate
by click on the icon between the `+` icon and the gear icon,
which looks like a box with a mouse cursor on it.

=SUBSLIDE=

#### Box model

=SPEAKERNOTES=

#### Box model

One of the peskiest things when it come to working with CSS and HTML
is understanding the box model of each element -
how exactly do `padding`, `border`, and `margin` all stack up in each case?
If you are like me and need constant reminding about how it works,
then you will find the diagram of the box model
which is displayed here extremely handy to have!

=SLIDE=

## Console Pane

- Using the REPL

=SPEAKERNOTES=

## Console Pane

The logs any output from the web page (usually produced by Javascript),
and also acts as a Javascript [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).
This read-eval-print-loop can be thought of as a Javascript command line,
which executes within the context of the current state of the web page being displayed.
This is most often useful when you wish to debug your web page.

=SUBSLIDE=

### Using the REPL

=SPEAKERNOTES=

Try typing any Javascript commands that you like into the Console,
hit `Enter` and the output from that command,
if any, will be printed below it.
`console.log();` and `console.assert();` are your friends!

Chrome's Console is pretty smart and does not simply print out a string
representation of everything.
If you `console.log();` a large or complex Javascript object,
a brief snippet of the object is printed, prefixed with an arrow.
If you click on the arrow, you can drill down into the object.
Similarly, if you `console.log();` a DOM element,
a brief snippet of that element is printed, prefixed with an arrow,
which you can click to drill down through the element -
(this works in exactly the same way as the DOM panel in the Inspector pane).
Try this:

- `console.log(document.body);`
- `console.assert(!document);`

Try some more advanced queries, where you can write any Javascript,
which and it will run as if the currently loaded page has run it.

- `10 + 20` (outputs 30)
- `document.querySelectorAll('p')` (selects all `<p />` DOM nodes in the page)

=SLIDE=

## Sources Pane

- Editing CSS files
- Saving edits
- Viewing JS files
- Debugging
  - Break points
  - Exceptions
  - Minified code
  - Pause state

=SPEAKERNOTES=

## Sources Pane

=SUBSLIDE=

### Editing CSS files

=SPEAKERNOTES=

### Editing CSS files

If you open up one of the CSS files used by your site,
and edit it, it has the same effect as editing it in the Styles panel
within the Elements pane - the web page updates to reflect the changes immediately!

However, there is a reason for you to make your edits here instead of in the Styles panel:
You can actually save these changes to disk,
bypassing the need to `Alt+Tab` back to your IDE or text editor.

Think about this for a moment.
You have literally got yourself a WYSIWYG web page editor,
right under your noses all along!

=SUBSLIDE=

### Saving Edits

=SPEAKERNOTES=

### Saving Edits

When you save the file (`Ctrl+S`), however,
you are only saving it to Chrome's own internal storage.
You aren't saving it to where this file is being served up from.

> **Why?**
>
> When you edit the source code for a web page,
> it usually consists *.html, *.css, and *.js files sitting on a folder on your disk.
>
> However, it is not best practice to open the files directly in your browser
> directly from the file system.
> Instead you should be running a simple web server,
> and point your browser at this web server.
>
> The easiest way to do this on most *NIX systems,
> is to `cd` into the folder from which you intend to serve files,
> and then run this command: `python -m SimpleHTTPServer`.
> If you prefer a NodeJs based solution,
> [http-server](https://www.npmjs.com/package/http-server)
> is pretty much the same thing.
> Next you simply visit [http://localhost:8080](http://localhost:8080),
> or whatever URL the server starts up in, in your browser.
>
> In any case, since your files are being served from a web server,
> if you want to tell Chrome to save file to a folder on your disk,
> you will need to tell Chrome where that folder is.

Right-click within a file, and select "Local Modifications" from the pop up menu
to see the list of all the changes made to the file while editing within the browser.
When you click to expand each one, it shows you a "diff",
in a style similar to source code version control systems such as *svn* or *git*.
If you click on the "Revert" link next to one of them,
Chrome will roll back all changes made to the file after that point,
restoring a previous state.

If you wish to save the file to a folder on the disk,
instead of locally within a browser,
right-click within the file, and select "Save As" from the pop-up menu.
Then simply navigate to the folder where
the original file being served is located, and overwrite it.
If you wish to do this very frequently,
rather than on a per-file basis,
it might be worthwhile adding a permanent mapping to Chrome's Dev Tools' settings.
To do this, `(gear icon) --> Workspace --> Folders --> Add Folder`
Next, with the folder selected, click "Folder Options",
and enter the mapping between the URL path and file folder location.

=SUBSLIDE=

### Viewing Javascript Files

=SPEAKERNOTES=

### Viewing Javascript Files

Viewing Javascript files works in the same way as CSS files.
It also happens in the Sources pane.
The main difference is that instead of getting hyperlinks to open up a particular file in the
Inspect CSS panel of the Elements pane,
hyperlinks to particular Javascript files with a line number to open up to
will be found in the output in the Console pane.
If you click on one of these links in the console,
that Javascript file will open up in the Sources pane,
and jump to the right line number.

This usually happens when the Javascript code outputs something
via the `console` global object,
or an error/ exception is thrown,
bringing us to the next topic: Debugging.

=SUBSLIDE=

### Debugging Javascript

=SPEAKERNOTES=

### Debugging Javascript

Debugging is the process of finding our where there has been a divergence between
what the computer has executed and what the original intent of the code was.
In other words, finding out where and why some code did this when it should have done that instead.

In the context of Javascript executing in a browser,
the most basic or rudimentary way to do this is to simply
pepper your code with `console.log` statements,
and then observe the output in the Console pane.
When you think you have found the cause,
simply edit the Javascript file to fix the error, and refresh the page.
This approach is quite effective for trivial problems -
trial and error can get you a long way in programming!

However, there are niftier tools at your disposal than that
made available to you in the Sources panel in Dev Tools,
such as breakpoints, and the ability to execute code in the context of a breakpoint,
and the ability to step through code line by line.
In other words, pretty much what you would expect an IDE
of any programming language to be able to do.

=SUBSLIDE=

#### Break points

=SPEAKERNOTES=

#### Break points

Setting a breakpoint is quite easy form the sources pane.
Simply scroll to any particular line in a Javascript file,
and then click on the margin (where the line number is).
You should see the line number highlighted in blue.
Click on the same line number again to remove that breakpoint.

Breakpoints can also be disabled.
This allows you to easily remember where the breakpoint was previously,
which is useful when you wish to turn it off only temporarily.
To do this, simply right-click on a break point,
and select "Disable breakpoint" from the pop-up menu.
The breakpoint highlight should turn from blue to a faded blue.

Breakpoints can also be conditional;
meaning that when the breakpoint is hit,
a certain expression is evaluated,
if that expression evaluates to a *truthy* value,
the breakpoint activates.
Otherwise, the breakpoint is skipped, and execution continues as per normal.
To do this, right-click on a break point,
and select "Edit breakpoint" from the pop-up menu.
Then type any valid Javascript expression into the text box which appears -
it would be most useful to use variables that should be present,
within the current scope,
when this line of code executes.
The breakpoint highlight should turn from blue to orange.
Conditional breakpoint can also be disabled,
using the same method as disabling a regular breakpoint.
The only difference is that their highlights are a faded orange colour.

For your convenience, all break points that have been set within the app
are listed under a "Breakpoints" section in the right column of the Sources pane.
Click on them to jump to the particular file and line where the break point has been set.
Toggle the check box on each break point to enable/ disable that one.

=SUBSLIDE=

#### Exceptions

=SPEAKERNOTES=

#### Exceptions

*Pause on exceptions* can be toggled by clicking on the
button that is a pause symbol within a stop-sign like octagon.

This button has three states:

- Off (grey)
- Pause on all exceptions (blue)
- Pause on uncaught exceptions (red)

=SUBSLIDE=

#### Minified code

=SPEAKERNOTES=

#### Minified code

When deploying a Javascript application,
it is standard practice to *minify* the Javascript source code
using libraries such as `uglify.js`.
Doing so has two main purposes:

- Decreasing file size: Makes the size of the files that the browser needs to download much smaller.
- Obfuscation: Makes it harder (but not impossible)
  for another developer to understand and therefore copy your code

This, of course makes debugging your own minified code harder.
Fortunately, dev tools can make this easier for you to do.

Look for the `{}` icon in the bottom of the sources pane.
It should be just to the left of the status text,
which reads something like "Line 123, Column 45".
This is the pretty-print button,
and simply expands minified code to include white space
(new line characters and tab stops).
It doesn't however, un-obfuscate the variable names.

The pretty print mode makes it far more easy to set breakpoints on minified code,
and also to see exactly where the exception occurs during when
*pause on exception* is turned on.

If the code is your own, however,
you should not rely on pretty print mode.
Instead you should ensure that your build tool outputs source maps
for you minified code.
When source maps are present,
Chrome knows about the mappings between the minified code
and the actual source code,
and therefore makes it much easier to work with when debugging.

A full discussion on source maps is beyond the scope of this article.
However, [this article](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
is an excellent resource which explains what source maps are,
and how to use them, in greater detail.

=SUBSLIDE=

#### Paused state

=SPEAKERNOTES=

#### Paused state

When in pause state, either because of a *pause on exception*,
or because a breakpoint was set,
or while stepping through code line by line,
you can inspect the state of the currently executing Javascript.

Hover your mouse over any variables to see it value.
To find the value of more complex expressions,
you can select the entire expression, then hover over it,
or you can type the expression into the console.

To type into the console, you can either switch to the Console pane,
or you can bring up the mini console,
by simply pressing the `Esc` key on your keyboard while still in the Sources pane.

Apart from inspecting the current state,
during paused state, you can control the execution flow.
If you are familiar with debugging from within an IDE,
this should be quite familiar!

The control flow buttons are located in the top-right corner of the Sources pane

- *Pause/play*: Resumes normal execution when paused. Pauses at current point of execution during normal execution
- *Step over*: Executes the current line of code, and goes to the next one.
- *Step into*: If the current line of code calls any functions, step into the execution path of that function
- *Step out*: Skip execution till the current function scope exits
- *Disable/enable all*: Disables or enables all breakpoints
- *Pause on exception*: Controls whether paused state is automatically entered upon an exception being thrown

=SLIDE=

## Network Pane

- The columns
- Inspecting resources
- Disable cache
- Page speed
  - Install plugin
  - Run plugin

=SPEAKERNOTES=

## Network Pane

When you are on a web page, and you open up Dev tool and go to the Network pane,
it is usually empty.
This is because you need the pane to be open before loading the page
in order for the network activity to be logged by the pane.
This is different from the other panes,
where any activity is that occurs while Dev tools are not open,
becomes accessible once it is opened.

=SUBSLIDE=

### The columns

=SPEAKERNOTES=

This pane is pretty straight forward.
It has various columns, not unlike the columns in the GUI of
a file system browser in an operating system.
The columns are:

- Path
  - The path on the server that was requested
- Method
  - The HTTP method for that path (GET/ POST/ PUT/ PATCH/ DELETE, etc.)
- Status
  - The HTTP response code and status text ("200 OK"/ "404 Not Found", etc.)
- Type
  - The response file type ("text/javascript"/ "image/png", etc)
- Initiator
  - Which other resource triggered the request for this resource
  - Click on the hyperlinks to open the Sources pane and jump to the file and line of code
- Size
  - The download size and the actual size of each resource
- Time
  - The download time and the latency time of each resource
- Timeline
  - Displays a the initial and final loading time for each resource
    such that all the resources together look like a Gantt chart.

=SUBSLIDE=

### Inspecting resources

=SPEAKERNOTES=

### Inspecting resources

Click on any of the resources,
and the table will collapse,
such that only the first column is visible ("Path").
The remaining area should now display a more detailed copy
of the network activity for that resource.

This will include the request and response HTTP headers,
the request body (if any),
and the response body,
plus more information about the timing.
Non-text files, such as images, also have a preview which display them visually.

=SUBSLIDE=

### Disable cache

=SPEAKERNOTES=

### Disable cache

WHile developing you might notice that after you edit some of your files,
and then refresh the page in the browser,
the changes that you just made may not have had any effect.
Or perhaps some of the changes had an effect,
and the others simply did not, even though you know that they should have.
One reason why this sort of this thing happens is caching that the browser does by default.
When a browser access any resource, it saves a copy of that resources to disk,
and when the same resource is loaded subsequently,
instead of making a HTTP request, and receiving the response,
which uses up some bandwidth and takes up some time;
it can be more efficient by simply reusing the copy saved to disk instead.
It chooses to do so based on how long ago
the resource was last actually loaded from the server.
You can tell when this is happening by looking at the *Status* column
in the Network pane.
Any resource listed as "304 Not modified" has not been downloaded again.
This behaviour is great is you are browsing someone else's website,
because you are going to appreciate the faster surfing.

However, when you are browsing your own website as you are developing it,
it is a totally different game.
You will be refreshing sometimes several time in a minute,
and each time you are expecting the page to behave slightly differently.
In such a situation, disabling the automatic caching behaviour is probably what you want.

To do this click on the gear icon in the top right corner of Dev tools.
This brings up the settings panel.
Under *General*, the the first option should be
"Disable cache (while DevTools is open)".
Ensure that this check box is ticked, then close the settings panel.
From now on, you whenever Dev tools is open,
which should be the case when you are developing your own website,
and probably will not be the case when you are browsing someone else's website,
caching is disabled.

=SUBSLIDE=

### PageSpeed

=SPEAKERNOTES=

### PageSpeed

[PageSpeed](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?hl=en)
is a Chrome extension which adds a brand new pane to DevTools,
the *PageSpeed pane*.
This pane complements the Network pane well.

Upon opening the PageSPeed pane in Dev tools,
the pane downloads the current page and runs several programmatic tests on it,
and gives the page a score out of 100.
Further to this, it also tells you where points were lost,
by listing suggestions about what you can do to improve the performance of the page.
For example, common ones would include:

- Minify and concatenate Javascript
- Minify and concatenate CSS

Minification and concatenation are important concepts in improving the
total time taken to download any text-based asset on a web page.
Usually you tend to do these for any Javascript files and CSS files.

Utilities such as [UglifyJs](https://github.com/mishoo/UglifyJS2),
helps with Javascript minification tasks.
These utilities strip out any unnecessary white space,
and shorten parameter names and function names,
among other techniques to output an almost unreadable,
but technically equivalent Javascript code.
The output code is much smaller as it has fewer characters.
In addition to this, there are multiple input Javascript files,
which result in just one output Javascript file.
This is important, because downloading one large file is always faster than
downloading multiple smaller files,
even when the sum of the sizes of the smaller files is equal to the size of the larger file.
The reason for this is that browsers have a self-imposed limit
on the total number of downloads it can do concurrently (usually about eight).
In addition, each time the browser downloads a resource,
it needs to make a separate HTTP request and receive a separate HTTP response.
Each request and response consists of a fairly significant overhead in terms
of [HTTP headers](http://code.tutsplus.com/tutorials/http-headers-for-dummies--net-8039),
which will be more or less the same between multiple Javascript files,
and thus is a waste of bandwidth, latency time, and download time.
Concatenating (joining) all the smaller files into one
therefore usually results in a significant page load speed improvement.

=SLIDE=

## Timeline Pane

- Frames panel
  - Why is FPS important?
  - Interpreting the histogram
- Memory panel
  - What are memory leaks?
  - Interpreting the graph

=SPEAKERNOTES=

## Timeline pane

=SUBSLIDE=

### Frames panel

Why is FPS important?

=SPEAKERNOTES=

### Frames panel

Frames per second (FPS) is a measure of the number of times the browser
can render a web page each second.
Generally speaking, the higher the number,
the better your web page.
The general consensus is that anything above 60 fps is **excellent**,
any thing above 30 fps is **good enough**,
anything less than 30 fps is **bad**,
and anything less than 15 fps is **very bad**.
These numbers depend upon characteristics of the human eye -
how frequently does an image have to refresh itself before
the illusion of smooth motion is perceived by the eye.

When a page is slow, the FPS drops, and once it drops below certain thresholds,
people looking at the page begin to notice that it "stutters".
Thus, when developing a page,
it is important to be sure that the FPS stays above the target threshold.
Things that can have a negative impact on FPS:

- Javascript execution
- Rendering (painting to screen)
- CSS style complexity

=SUBSLIDE=

### Frames panel

Interpreting the histogram

=SPEAKERNOTES=

Open up the Timeline pane, and select "Frames" on the left to open the Frames panel.
Next, click on record.
Now, trigger various events that cause the p[age to re-render,
and observe the graph fill up.
Next, click the record button again to stop recording.

The histogram represents the time taken for each thing to happen,
and the when the height exceeds each FPD marker is significant.

The 60 fps line is exceeded when the frame takes more than 1/60 seconds to complete,
and likewise, the 30 fps line is exceeded when the frame takes more than 1/30 seconds.

Each bar comprises of various colours:

- Yellow: Javascript execution
- Purple: Style & position calculations
- Green: Painting to screen
- Transparent: Other miscellaneous tasks

When a task spikes above the 60 fps threshold,
that makes it a possible candidate for further investigation.
When a task spikes above the 30 fps threshold,
that makes it a definite candidate for further investigation.
If the spike was, say mostly yellow,
that would indicate that CPU profiling would be most relevant here.
If the spike was, say mostly purple or green,
then it is worth reviewing the complexity of the CSS rules applied
on the relevant elements.

=SUBSLIDE=

### Memory panel

What are memory leaks?

=SPEAKERNOTES=

### Memory panel

*Memory leaks* occur when the application uses up more and more memory
as the page continues its execution of Javascript.
Sometimes increased memory usage is expected,
for example, when the page has loaded more data than before.
However in some cases, the memory just goes up anyway,
even though the page is not doing much.
This is caused when memory has been allocated to store certain data,
but when that data is no longer needed,
that memory is left alone, instead of being freed.

=SUBSLIDE=

### Memory panel

Interpreting the graph

=SPEAKERNOTES=

The memory panel works in the same way as the frames panel,
except that instead of measuring the FPS,
it measures the total memory usage of the page.
This is useful to identify which actions on the page result in higher memory usage,
and more importantly which ones cause memory leaks.

=SLIDE=

## Profiles pane

- CPU profiling
  - Use with Timeline→Frames
  - Identifying functions to optimise
- Memory profiling
  - Use with Timeline→Memory
  - Identifying memory leaks

=SPEAKERNOTES=

## Profiles pane

=SUBSLIDE=

### CPU profiling

=SPEAKERNOTES=

### CPU profiling

In the Profiles pane, select "Collect Javascript CPU Profile",
then press the start button below.
Now interact with the page in some way
which causes Javascript which we wish to profile to execute,
then click on the stop button.

Next you will see a  which lists all the function that were called,
and how much time was spent executing each of them.
You can click each of the column headers to sort the table by that attribute,
but most likely what you will want (also the default),
is the "Self" execution time as a percentage of the total execution time,
in decreasing order.
The functions which take the longest to execute are the prime candidates
for performance optimisation.
However, sometimes very small simple functions which get called many times
wind up at the top here.
In cases like this, sort by the "Total" execution time,
and see which functions take the longest to execute,
including the duration of the functions which they invoke.
By looking at this list, in combination with the previous one,
plus some guesswork, you should be able to identify which functions
are calling the very frequently executed functions.
If this is indeed the case,
perhaps the performance optimisations should be done in the calling function.

You can inspect each of these functions by clicking on the hyperlink
in the last column of each one,
which will open the Sources pane,
opening to the selected file, and jumping to the relevant line number.

The idea here is that you use the Timeline pane to detect which frames are slow,
at a higher level - identifying where potential performance bottlenecks are;
and then subsequently use the Profiles pane to identify exactly
where these performance bottlenecks occur.

=SUBSLIDE=

### Memory profiling

=SPEAKERNOTES=

### Memory profiling

In the Profiles panel, select "Take Heap Snapshot",
then press "Take Snapshot".
You will now see a summary of all the different things that the page had stored
in memory at that point of time, organised by type.
Now interact with the page in some way that causes the memory leak to occur.
Then click on record button, in the bottom-left corner,
and this takes another heap snapshot.
Then select the second snapshot (the newer one),
and in the bar a the bottom,
click on "Summary" and change this to "Comparison".

This should now show all the objects in the heap that were in the second snapshot,
but not in the first.
Inspect this list to identify any objects which should no longer be hanging around,
and should have been removed from memory.
Common offenders include event listener functions
attached to DOM elements which have been removed from the page,
and DOM elements removed from the page,
but whose references are stored in variables somewhere.

=SLIDE=

## Round up

- Chrome DevTools: A non-IDE IDE for web dev
- Development: Use the Elements, Sources, and Console panes
- Optimisation: Use the Network, Timeline, PageSpeed, and Profiles panes

=SPEAKERNOTES=

Chrome has a lot of features which you would expect an IDE to have.

Since you can actually edit files and even save them to disk
using DevTools, it actually come full circle.

Some of the panes within DevTools are suited toward aiding the development life-cycle.

The other panes within DevTools are more suited towards identifying optimising
targets for a web page.

=SLIDE=

## Q & A

=SLIDE=

> Fin!
