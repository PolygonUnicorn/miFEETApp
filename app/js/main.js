//VARIABLES
const { app, BrowserWindow, screen, ipcRenderer } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
const fs = require('fs');

let mainWin;
let loginWin;
let controllerWin;

let isLoggedIn = false;
let username;


//FUNCTIONS


//LOGIN WINDOW
//Instanciate the login window
function createLoginWindow(){
  loginWin = new BrowserWindow({
    width: 450,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false,
    maximizable: false,
    resizable: false
  });

  //Hides menu bar
  //loginWin.setMenuBarVisibility(false);

  loginWin.loadURL(url.format({
    pathname: path.join(__dirname, "../html/login.html"),
    protocol: "file",
    slashes: true
  }));

  //Once loaded, show
  loginWin.once("ready-to-show", () => {
    loginWin.show();
  });
  
  //If closed by user before login, quit the whole app
  loginWin.on("closed", () => {
    if(!isLoggedIn){
      app.quit();
    }
  });

  //Open devtools
  //mainWin.webContents.openDevTools();
}



//MAIN EDITOR WINDOW
//Instanciate the main window
function createMainWindow(){
  //Get device width and height
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWin = new BrowserWindow({
    width,
    height,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  //Hides menu bar
  mainWin.setMenuBarVisibility(false);

  //Create the window
  mainWin.maximize();
  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, "../html/index.html"),
    protocol: "file",
    slashes: true
  }));

  //If closed, save progress
  mainWin.on("closed", () => {
    //TODO: save the progress to sql
  });

  //Open devtools
  //mainWin.webContents.openDevTools();
}



//CONTROLLER
//Instanciate the Controller window
function createControllerWindow(){
  //Get device width and height
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  controllerWin = new BrowserWindow({
    width,
    height,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  //Hides menu bar
  //controllerWin.setMenuBarVisibility(false);

  //Maximize the window
  controllerWin.maximize();

  controllerWin.loadURL(url.format({
    pathname: path.join(__dirname, "../html/controller.html"),
    protocol: "file",
    slashes: true
  }));

  //If closed, quit the whole app
  controllerWin.on("closed", () => {
    app.quit();
  });
}



//OTHER
//Once electron is ready, do these:
app.on('ready', createLoginWindow);

//Quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit();
  }
});


//IPC COMMUNICATION
//Calls on login
ipcMain.on('login', (event, arg) => {
  isLoggedIn = true;
  username = arg;
  fs.writeFile("./app/temp/temp.txt", username, function (err) {
    if(err) return console.log(err);
    console.log('Temp file created');
  });

  createControllerWindow();
});


//Calls main editor window
ipcMain.on('editor-window', (event, arg) => {
  createMainWindow();
});