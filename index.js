const {query} = require('express');
const express = require('express');
const app = express();

const mySQL = require('mysql');
const connect = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_dwwm_garage"
});

app.use(express.static('public'));

app.use(express.json());

app.set('view engine', "ejs");
app.set('views', '/views');