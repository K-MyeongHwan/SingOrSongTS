import express, { Express, Request, Response } from 'express';

const app :Express = express();
const port :number = 3000;
const cors = require("cors");

//database 설정
const db = require("./config/mysql");
const conn = db.init();

const home = require("./routes/home");

app.use(cors());

app.use('/', home);

app.get('/api/song', (request :Request, response :Response)=>{
    let sql = "select * from song";
    conn.query(sql, (error :string, result :JSON)=> {
        if (error) {
            console.log("query error : " + error);
        } else {
            response.send(result);
        }
    })
});

app.get('/api/singer/:singerNum', (request :Request, response :Response)=>{
    let sql = "select * from singer where singerNum = " + request.params.singerNum;
    conn.query(sql, (error :string, result :JSON)=> {
        if(error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})

app.get('/api/category/:categoryNum', (request :Request, response :Response)=>{
    let sql = "select * from category where categoryNum =" + request.params.categoryNum;
    conn.query(sql, (error :string, result :JSON) =>{
        if(error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})

app.listen(port, ()=>{
    console.log("System : localhost:3000 hosting");
});