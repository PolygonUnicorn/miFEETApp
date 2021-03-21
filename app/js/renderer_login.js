const { ipcRenderer } = require('electron');
const remote = require('electron').remote;


//VARIABLES
let userInput;
let passInput;
let errMes;


//ONLOAD
window.onload = (event) => {
    userInput = document.getElementById("user");
    passInput = document.getElementById("pass");
    errMes = document.getElementById("errMes");
}

//FUNCTIONS
function login(){
    if(passInput.value == "heslo"){
        let window = remote.getCurrentWindow();
        console.log(ipcRenderer.sendSync('login', userInput.value)); // prints "pong"
        window.close();

    }else{
        errMes.innerHTML = "Špatné heslo!";
    }

    
    //ipcRenderer.send('asynchronous-message', 'ping')
}