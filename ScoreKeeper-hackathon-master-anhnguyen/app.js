const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/ScoreKeeper', { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('connected');
})

app.use('/', router);

app.use('/public', express.static('./public'));

app.listen(3000, function () {
    console.log('server listening on port 3000');
})