import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'fs';
import * as path from 'path';
var mainWindow: BrowserWindow;

console.log('NODE_ENV', process.env.NODE_ENV);

const indexFile = path.join('file:', __dirname, '/../renderer/index.html');
const fileUrl = new URL(indexFile).href;
/**
 *
 */
function createWindow(): BrowserWindow {
  // Create the browser window.
  let userWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
  });
  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
  if (process.env.NODE_ENV == 'development') {
    userWindow.loadURL('http://127.0.0.1:9000');
  } else {
    console.log('indexFile', fileUrl);
    userWindow.loadURL(fileUrl);
  }
  // Open the DevTools.
  userWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  userWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    userWindow = null;
  });
  return userWindow;
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log('get lock fial, do quit ');
  app.quit();
} else {
  app.on('second-instance', () => {
    // Print out data received from the second instance.
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    mainWindow = createWindow();
  });
}
app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow();
  }
});
ipcMain.on('asynchronous-message', function (event, arg) {
  console.log(arg); // prints "ping"
});
