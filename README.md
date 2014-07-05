chilipeppr.com/tinyg
=====

The tracking location for tickets for the chilipeppr.com/tinyg workspace. 

The live version is only on the ChiliPeppr Hardware Fiddle site because it is a mashup of live JSFiddles, therefore it is not on Github as a downloadable project, however Github is being used to track issues.
[ChiliPeppr Hardware Fiddle - TinyG Workspace](http://chilipeppr.com/tinyg)

![Screenshot](http://chilipeppr.com/img/screenshot2.png "Screenshot")


Philosophy
----

The philosophy behind how ChiliPeppr Hardware Fiddle works is that interfacing hardware with software needs to be easier. Getting access to hardware typically requires a serial port interface. ChiliPeppr has a Serial Port JSON Server that solves that by creating a websocket bridge between your serial port and your browser. Once that is achieved you can now manipulate the hardware from the browser using Javascript.

Javascript is now a full-blown language thanks to modern browsers. It's fast and easy to write. The browser itself now has massive power and speed with WebGL support, live injection of code, easy DOM manipulation, etc. So the browser is one of the best places to have a user interface. Moreover, it's easy for people to load the software and run it vs. downloading Java code and trying to get it to compile.

Easy to Extend
----
Controlling hardware, in particular CNC controllers or Arduinos, really needs a base operating system that has all of the key functionality implemented. Then other users can lay apps on top of the base operating system. That's the way ChiliPeppr Hardware Fiddle is setup. You can check out lots of sample apps in the existing workspaces, but then fork the widgets and workspaces to roll your own. So, if you want to setup an online oscilloscope, just fork the widgets that most closely match what you want to build, use other widgets directly without modifying (like the Serial Port Widget), and create your own mashup.

Offline Version
----

An offline snapshot version of the app is here on Github, however it does not function yet. It is simply a cut/paste of the source code from the browser DOM after the browser has done all of the hard work to pull all JSFiddles inline. All external Javascript files would still need to be brought into the overall codebase like the Three.js files that are used by the 3D Viewer and Auto-Level widgets.

It will be up to the community to work up an offline version. Some suggestions would be to use the Charles Proxy to coerce your local browser into getting redirects to local files. Since ChiliPeppr is a very dynamic app with lots of features constantly being added, you would have to grab the latest snapshot and then watch your browser console window to see what external files it is requesting. Then go manually download those files to your local machine and register that URL inside of Charles to redirect to a local file. It's a bit of work, but for those who really need an offline version that is a workable strategy.

Another idea would be to write a local script that downloads the main file and then pulls in all external files. This could be a decent amount of work though because you would have to parse the Javascript to find external files and then remap their download URLs inside the Javascript so they point to local resources. ChiliPeppr does use Require.js as the backing Javascript dependency system, so researching how Require.js works and looking at the code for the require.config{} objects could be a workable method.

