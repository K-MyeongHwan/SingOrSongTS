import {Connection} from "mysql2";

const mysql = require('mysql2');

const db_info = {
    host : "localhost",
    port : "3306",
    user : "kmhUser",
    password : "Rlaaudghks01!",
    database : "sosDB"
};

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function (conn :Connection) {
        conn.connect(function (err) {
            if (err) console.error("mysql connection error : " + err);
            else console.log("mysql is connected successfully!");
        });
    },
};
