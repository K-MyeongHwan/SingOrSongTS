"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const cors = require("cors");
//database 설정
const db = require("./config/mysql");
const conn = db.init();
const home = require("./routes/home");
app.use(cors());
app.use('/', home);
app.get('/api/song', (request, response) => {
    let sql = "select * from song";
    conn.query(sql, (error, result) => {
        if (error) {
            console.log("query error : " + error);
        }
        else {
            response.send(result);
        }
    });
});
app.get('/api/singer/:singerNum', (request, response) => {
    let sql = "select * from singer where singerNum = " + request.params.singerNum;
    conn.query(sql, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            response.send(result);
        }
    });
});
app.listen(port, () => {
    console.log("System : localhost:3000 hosting");
});
