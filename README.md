chilipeppr.com/tinyg
=====

The tracking location for tickets for the chilipeppr.com/tinyg workspace. 

The live version is only on the ChiliPeppr Hardware Fiddle site because it is a mashup of live JSFiddles, therefore it is not on Github as a downloadable project, however Github is being used to track issues.
[ChiliPeppr Hardware Fiddle - TinyG Workspace](http://chilipeppr.com/tinyg)

![Screenshot](http://chilipeppr.com/img/screenshot2.png "Screenshot")

An offline snapshot version of the app is here on Github, however it does not function yet. It is simply a cut/paste of the source code from the browser DOM after the browser has done all of the hard work to pull all JSFiddles inline. All external Javascript files would still need to be brought into the overall codebase like the Three.js files that are used by the 3D Viewer and Auto-Level widgets.

Philosophy
----

The philosophy behind how ChiliPeppr Hardware Fiddle works is that interfacing hardware with software needs to be easier. Getting access to hardware typically requires a serial port interface. ChiliPeppr has a Serial Port JSON Server that solves that by creating a websocket bridge between your serial port and your browser. Once that is achieved you can now manipulate the hardware from the browser using Javascript.

Javascript is now a full-blown language thanks to modern browsers. It's fast and easy to write. The browser itself now has massive power and speed with WebGL support, live injection of code, easy DOM manipulation, etc. So the browser is one of the best places to have a user interface. Moreover, it's easy for people to load the software and run it vs. downloading Java code and trying to get it to compile.

Easy to Extend
----
Controlling hardware, in particular CNC controllers or Arduinos, really needs a base operating system that has all of the key functionality implemented. Then other users can lay apps on top of the base operating system. That's the way ChiliPeppr Hardware Fiddle is setup. You can check out lots of sample apps in the existing workspaces, but then fork the widgets and workspaces to roll your own. So, if you want to setup an online oscilloscope, just fork the widgets that most closely match what you want to build, use other widgets directly without modifying (like the Serial Port Widget), and create your own mashup.
