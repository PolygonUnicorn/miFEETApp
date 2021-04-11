const { ipcRenderer } = require('electron');
const remote = require('electron').remote;
const fsql = require("../js/functions-sql.js");


//VARIABLES
let userInput;
let passInput;
let errMes;


//ONLOAD
window.onload = (event) => {
    userInput = document.getElementById("user");
    passInput = document.getElementById("pass");
    errMes = document.getElementById("errMes");

    fsql.JoinIn();
}

//FUNCTIONS
function login(){

    let heslo;

    fsql.LogMe(userInput.value, passInput.value, function(result){
        heslo = result;
        console.log(heslo);

        if(heslo == 1){
            console.log("No, mělo by náš to připojit no");
            let window = remote.getCurrentWindow();
            console.log(ipcRenderer.send('login', userInput.value)); // prints "pong"
            window.destroy();
    
        }else{
            errMes.innerHTML = "Špatné heslo!";
        }
    });
    

    
    //ipcRenderer.send('asynchronous-message', 'ping')
}