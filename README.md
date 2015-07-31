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

The offline version in this repo is intended to be fully functional when served from Nginx on the same machine as the Serial Port JSON Server - laptop, RaspberryPi, BeagleBone Black, etc.

To get it working:

 1. [Install Nginx](http://wiki.nginx.org/Install) - Plenty of good resources out there explain how to do this for any OS.

 2. Add the Chilipeppr Server - If you don't have an existing Nginx setup, it will probably be easiest to replace the default Nginx config with one from the utils folder, appropriate for your host OS. The Ubuntu config is only a server block, so you'll want to add that as an available server. Digital Ocean has a nice guide for setting up Nginx on Ubuntu [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-14-04-lts).

    Note that the server blocks are configured to respond to requests for "cpep.loc" - if you want the server to answer requests for any name, modify the listen directive to look like:
    
        listen 80 default_server;

    More info about server names [here](http://nginx.org/en/docs/http/server_names.html).

 3. Add an entry to the client's hosts file - This step is for whatever computer you will be opening up a browser and using Chilipeppr on. Open up the hosts file and add an entry for the new server.

    On a mac: 

        sudo nano /private/etc/hosts

    On Ubuntu:

        sudo nano /etc/hosts

    On Windows:

        notepad c:\windows\system32\drivers\etc\hosts


    Add an entry for the Chilipeppr server. If you are browsing from the same computer the server is running on, this line will look like:

        127.0.0.1       cpep.loc


Browser to http://cpep.loc/tinyg and you should be up and running! (If you used port 8080 as in the mac config, the url should be http://cpep.loc:8080/tinyg/)