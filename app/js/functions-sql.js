/*
-------------------------------------------------------------------------------------------------------------------------

Require funkce

-------------------------------------------------------------------------------------------------------------------------
*/

const crypto = require("crypto");
const mysql = require("mysql");

/*
-------------------------------------------------------------------------------------------------------------------------

Pomocné funkce k databázi + propojení

-------------------------------------------------------------------------------------------------------------------------
*/

//vytváření spojení mysql databáze a nodejs
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "medicalapp",
});

//pomocná funkce pro získání času
function GetTimeDate() {
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
}

//funkce vytvářející hash z hesel
function generateHash(newpassword) {
  var name = newpassword;
  var hash = crypto.createHash("md5").update(name).digest("hex");
  return hash;
}

/*
-------------------------------------------------------------------------------------------------------------------------

Funkce na vytváření, ukazování lidí

-------------------------------------------------------------------------------------------------------------------------
*/

//funkce vracející všechny lidi, nehledě na jejich postavení, do konzole
function ShowPeople() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM login", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

//přetížená funkce vracející emaily
function ShowPeople(email) {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT email FROM login", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

//funkce vracející všechny pacienty
function ShowPatients() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM info where id_sp IS NULL", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

//přetížená funkce, která volá určitého pacienta
function ShowPatients(idpatient) {
  con.connect(function (err) {
    if (err) throw err;
    var values = [idpatient];
    con.query(
      "SELECT * FROM info where id = ?",
      [values],
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
}

//funkce, která ukáže všechny doktory
function ShowDoctor() {
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM info where id_sp IS NOT NULL",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
}

//přetížená funkce, která ukáže doktora podle id
function ShowDoctor(iddoctor) {
  con.connect(function (err) {
    if (err) throw err;
    var values = [iddoctor];
    con.query(
      "SELECT * FROM info where id_sp =?",
      [values],
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
}

//funkce vytvářející nové lidi
function InsertNewPeople(email, password) {
  con.connect(function (err) {
    if (err) throw err;
    var sql = "INSERT INTO login (email, password) VALUES (?)";
    var values = [email, generateHash(password)];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
    });
  });
}

/*
-------------------------------------------------------------------------------------------------------------------------

Funkce na vytváření, ukazování poznámek

-------------------------------------------------------------------------------------------------------------------------
*/

//funkce vytvářející nové poznámky
function InsertNote(
  type_note,
  header,
  doc,
  pacient,
  textnote,
  notethedate,
  time
) {
  con.connect(function (err) {
    if (err) throw err;
    var sql =
      "INSERT INTO notes (id_nt, name_note, id_doc, id_pac, text_note, date_time_note, timestamp_note) VALUES (?)";
    var values = [type_note, header, doc, pacient, textnote, notethedate, time];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
    });
  });
}

//funkce ukazující všechny poznámky
function ShowNotes() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM notes", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

//přetížená funkce ukazující pacientovi poznámky
function ShowNotes(patientid) {
  con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM notes where id_pac = ?";
    var values = [patientid];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}
