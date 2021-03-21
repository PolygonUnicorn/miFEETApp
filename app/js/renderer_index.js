//VARIABLES
const { ipcRenderer } = require('electron');
const fs = require('fs');

let nameDiv;
let dateDiv;
let insurDiv;
let rcDiv;
let specDiv;


//ONLOAD
window.onload = (event) => {
    nameDiv = document.getElementById("patient-name");
    dateDiv = document.getElementById("patient-date");
    insurDiv = document.getElementById("patient-insur");
    rcDiv = document.getElementById("patient-rc");
    specDiv = document.getElementById("patient-spec");
    

    let titleElement = document.getElementById("title");

    //Read the Temp file
    let patientName;
    fs.readFile("./app/temp/temp.txt", "utf8", (err, data) => {
        if(err) return console.log(err);
        titleElement.innerHTML = "FEETApp - " + data;
        patientName = data;
    });

    getPatientInfo(patientName);


    //Delete it
    fs.unlink("./app/temp/temp.txt", (err) => {
        if(err) return console.log(err);
        console.log("Temp file deleted");
    });
}


//FUNCTIONS
function getPatientInfo(patientName){
    //TODO: Get the values from the patient
    setPatientInfo();
}


function setPatientInfo(data = {name: "jmeno", date: "datum", insur: "pojistovna", rc: "RC", spec: "specializace"}){
    nameDiv.innerHTML = data.name;
    dateDiv.innerHTML = data.date;
    insurDiv.innerHTML = data.insur;
    rcDiv.innerHTML = data.rc;
    specDiv.innerHTML = data.spec;
}