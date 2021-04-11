/*
-------------------------------------------------------------------------------------------------------------------------

Require funkce

-------------------------------------------------------------------------------------------------------------------------
*/

const crypto = require("crypto");
const mysql = require("mysql");

module.exports = {

    /*
    -------------------------------------------------------------------------------------------------------------------------

    Pomocné funkce k databázi + propojení

    -------------------------------------------------------------------------------------------------------------------------
    */

    //vytváření spojení mysql databáze a nodejs
    con: mysql.createConnection({
      host: "89.102.177.117",
      port: "3306",
      user: "tadeasek",
      password: "parez123",
      database: "medicalapp"
    }),

    JoinIn: function(){
        this.con.connect(function(err){
            if(err) throw err;
            console.log("Úspěšně připojeno!");
        });
    },


    //pomocná funkce pro získání času
    getTimeDate: function(){
      let currentdate = new Date();
      let datetime =
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
    },

    //funkce vytvářející hash z hesel
    generateHash: function(newpassword){
      let name = newpassword;
      let hash = crypto.createHash("md5").update(name).digest("hex");
      return hash;
    },

    /*
    -------------------------------------------------------------------------------------------------------------------------

    Funkce na vytváření, ukazování lidí

    -------------------------------------------------------------------------------------------------------------------------
    */

    //funkce vracející všechny lidi, nehledě na jejich postavení, do konzole
    showPeople: function(){
      this.con.query("SELECT * FROM login", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    },

    //přetížená funkce vracející emaily
    showPeople: function(email){
        this.con.query("SELECT email FROM login", function (err, result) {
          if (err) throw err;
          console.log(result);
        });
    },

    //přetížená funkce, která volá určitého pacienta
    showPatients: function(idpatient){
      let values = [idpatient];
      this.con.query("SELECT * FROM info where id = ?", [values],
        function (err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    },

    //funkce, která ukáže všechny pacienty
    //funkce, která ukáže všechny doktory
    ShowPatients: function(){
      this.con.query(
        "SELECT * FROM info where id_sp IS NULL",
        function (err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
  },

    //funkce, která ukáže všechny doktory
    ShowDoctor: function(){
        this.con.query(
          "SELECT * FROM info where id_sp IS NOT NULL",
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
        );
    },

    //přetížená funkce, která ukáže doktora podle id
    ShowDoctor: function(iddoctor){
        let values = [iddoctor];
        this.con.query(
          "SELECT * FROM info where id_sp =?",
          [values],
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
        );
    },

    //funkce vytvářející nové lidi
    InsertNewPeople: function(email, password){
        let sql = "INSERT INTO login (email, password) VALUES (?)";
        let values = [email, this.generateHash(password)];
        this.con.query(sql, [values], function (err, result) {
          if (err) throw err;
        });
    },

    LoginIntoCheck: function(email, password){
      var sql = "SELECT COUNT(d_id) from login WHERE email = ? AND password = ?";
      let values = [email];
      let values2 = [this.generateHash(password)];
      this.con.query(sql, [values, values2], function (err, result) {
        if (err) throw err;
        return result;
      });
    },
    
    LogMe: function(email, password) {
      let yesno = false;
      yesno = this.LoginIntoCheck(email, password);
      console.log(yesno);
      return yesno;
    },

    /*
    -------------------------------------------------------------------------------------------------------------------------

    Funkce na vytváření, ukazování poznámek

    -------------------------------------------------------------------------------------------------------------------------
    */

    //funkce vytvářející nové poznámky
    InsertNote: function(
      type_note,
      header,
      doc,
      pacient,
      textnote,
      notethedate,
      time){
        let sql = "INSERT INTO notes (id_nt, name_note, id_doc, id_pac, text_note, date_time_note, timestamp_note) VALUES (?)";
        let values = [type_note, header, doc, pacient, textnote, notethedate, time];
        this.con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log(result);
        });
    },

    //funkce ukazující všechny poznámky
    ShowNotes: function(){
        this.con.query("SELECT * FROM notes", function (err, result) {
          if (err) throw err;
          console.log(result);
        });
    },

    //přetížená funkce ukazující pacientovi poznámky
    ShowNotes: function(patientid){
        let sql = "SELECT * FROM notes where id_pac = ?";
        let values = [patientid];
        this.con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log(result);
        });
    }

}