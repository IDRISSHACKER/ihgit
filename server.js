const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
require('dotenv').config();

const APP_PORT = process.env.PORT || 5050;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use("/api/", api);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
});
