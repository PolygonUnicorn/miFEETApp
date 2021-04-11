const { ipcRenderer } = require('electron');

let editorButton;


//Onload
window.onload = (event) => {

    editorButton = document.getElementById("editorButton");

}


function openMainEditor(){
    console.log(ipcRenderer.send('editor-window', null));
}