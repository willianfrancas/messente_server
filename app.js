const http = require("http");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const app = express();
const port = process.env.PORT || 7000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://messente.herokuapp.com/');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const myLogger = (req, res, next) => {
    next();
};

app.use(myLogger);
app.use('/api', api);

app.use((req, res, next) => {
    res.status(404).send({ msg: 'Not Found!' });
});

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});