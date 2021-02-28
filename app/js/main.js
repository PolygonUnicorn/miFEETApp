//VARIABLES
const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

let win;


//FUNCTIONS
function createWindow(){
  //Instanciate the window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  //Create the window
  win.loadURL(url.format({
    pathname: path.join(__dirname, "../html/index.html"),
    protocol: 'file',
    slashes: true
  }));

  //Open devtools
  win.webContents.openDevTools();

  //When closed
  win.on('closed', () => {
    win = null;
  });
}


//Once electron is ready, do these:
app.on('ready', createWindow);

//Quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit();
  }
});