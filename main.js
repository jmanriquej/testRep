'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');


var mainWindow = null;



app.on('ready', function() {
    mainWindow = new BrowserWindow({
       "fullscren":true,
       "node-integration": false,
       "width": 1400,
       "height": 800,
       "skip-taskbar": false
    });

    mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');

});



var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':

      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }
};

if (handleStartupEvent()) {
  return;
}