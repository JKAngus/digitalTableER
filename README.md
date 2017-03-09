# digitalTableER

This is a research project by Angus Jo Kwang parterned with Professor Carl Gutwin in University of Saskatchewan.

The purpose of this project is to find out how to utilize digital table on drawing ER diagram, especially on multiple user working simultaneously.

This is a web application which uses Chrome, tuio and and middleware to work.  The middle where read tuio data and republish them to websockets.

The middleware: [TouchEventServer](http://dougx.net/tuio/TouchEventServer_1.0_setup.exe)

Tutorial:

Everyone works base on their own toolbox.  You can create a new toolbox by touching the table with three fingers.  You can move the toolbox by dragging it or by touching the empty space on the table with two fingers.  This will also rotate the toolbox based on your fingers.  It anchors itself to your first finger and rotates to your second finger.  When there is more than one toolbox on the table, it will draw lines between them and define your own working area.  Your toolbox’s functions only work in your working area.

Add/Move create new modules or move existing ones.  Tap on empty space to create, drag existing one to move them.  Link creates links between modules.  Drag from one to another module.  Edit lets you type in modules.  Tap on a module to input to it.  Remove removes modules or links.  Tap on them to remove them.
