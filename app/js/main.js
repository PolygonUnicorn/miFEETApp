//VARIABLES
const { app, BrowserWindow, screen, ipcRenderer } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');
const fs = require('fs');

let mainWin;
let loginWin;

let isLoggedIn = false;
let username;


//FUNCTIONS

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
    minimizable: false,
    maximizable: false,
    resizable: false
  });

  //Hides menu bar
  loginWin.setMenuBarVisibility(false);

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


//Instanciate the main window
function createMainWindow(){
  //Get device width and height
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWin = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  //Hides menu bar
  //mainWin.setMenuBarVisibility(false);

  //Create the window
  mainWin.maximize();
  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, "../html/index.html"),
    protocol: "file",
    slashes: true
  }));

  //If closed, quit the whole app
  mainWin.on("closed", () => {
    app.quit();
  });

  //Open devtools
  //mainWin.webContents.openDevTools();
}


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

  createMainWindow();
});