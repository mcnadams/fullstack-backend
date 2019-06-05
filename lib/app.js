const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const cors = require('cors');

app.use(require('cookie-parser')());
app.use(express.json());
app.use(cors());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
