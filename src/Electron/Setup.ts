import { app, BrowserWindow } from "electron";
import Wait from "../Utils/Wait";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let windows: { [key: string]: BrowserWindow } = {};
let webPreferences = { nodeIntegration: true };

function createWindow(width: number, height: number, options = {}) {
  // Create the browser window.
  let window: BrowserWindow | null = new BrowserWindow({
    width: width,
    height: height,
    ...options
  });

  // Emitted when the window is closed.
  window.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    Object.keys(windows).map(key => delete windows[key]);
  });

  return window;
}

function initialize() {
  let browserWindow = createWindow(1024, 768, {
    webPreferences: {}
  });
  windows["browser"] = browserWindow;

  let commentWindow = createWindow(300, 768, {
    frame: false,
    parent: browserWindow,
    x: browserWindow.getBounds().x - 300,
    y: browserWindow.getBounds().y,
    webPreferences
  });
  commentWindow.loadFile(
    "/Users/gregory_gzik/src/hercules/client/comments.html"
  );
  windows["comments"] = commentWindow;
}

async function loadBrowser(url: string) {
  await Wait(() => app.isReady());
  windows["browser"].loadURL(url);
}

function registerOnClose(action: () => void) {
  app.on("window-all-closed", action);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", initialize);

registerOnClose(() => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows === null) {
    initialize();
  }
});

export { windows, loadBrowser, registerOnClose };
