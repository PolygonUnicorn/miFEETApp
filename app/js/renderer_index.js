//VARIABLES
const { ipcRenderer } = require('electron');
const fs = require('fs');


window.onload = (event) => {
    titleElement = document.getElementById("title");

    //Read the Temp file
    fs.readFile("./app/temp/temp.txt", "utf8", (err, data) => {
        if(err) return console.log(err);
        titleElement.innerHTML = "FEETApp - " + data;
    });

    //Delete it
    fs.unlink("./app/temp/temp.txt", (err) => {
        if(err) return console.log(err);
    });
}