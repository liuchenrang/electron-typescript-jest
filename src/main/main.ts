import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
var mainWindow: BrowserWindow;

console.log("NODE_ENV", process.env.NODE_ENV);

const indexFile = path.join("file:", __dirname, "/../renderer/index.html");
const fileUrl = new URL(indexFile).href;
/**
 *
 */
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });
  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
  if (process.env.NODE_ENV == "development") {
    mainWindow.loadURL("http://127.0.0.1:9000");
  } else {
    console.log("indexFile", fileUrl);
    mainWindow.loadURL(fileUrl);
  }
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain.on("asynchronous-message", function (event, arg) {
  console.log(arg); // prints "ping"
});