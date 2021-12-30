const http = require("http");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const MessenteApi = require('messente_api');

const defaultClient = MessenteApi.ApiClient.instance;
const basicAuth = defaultClient.authentications['basicAuth'];

basicAuth.username = process.env.MESSENTE_USER;
basicAuth.password = process.env.MESSENTE_PWD;

const api = new MessenteApi.OmnimessageApi();

const sms = MessenteApi.SMS.constructFromObject({
    sender: `<sender name (optional)>`,
    text: 'hello sms :)',
});

const omnimessage = MessenteApi.Omnimessage.constructFromObject({
    messages: [sms],
    to: '<recipient_phone_number>',
});

api.sendOmnimessage(omnimessage, (error, data) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`API called successfully. Returned data: ${data}`);
    }
});

const app = express();
const port = process.env.PORT || 7000;
const URL = process.env.MESSENTE_URL;

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", 'https://my-todo-mongodb.herokuapp.com');
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
}
app.use(myLogger);

app.use((req, res, next) => {
    res.status(405).send({ msg: sms });
});

app.listen(port);