const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');
const cors = require('cors');
const photosRoutes = require('./routes/photo');
const commentRoutes = require('./routes/comment');

app.use(express.json());
app.use(cors());

app.use('/api/v1/', mongoConnection, photosRoutes);
app.use('/api/v1/comment', mongoConnection, commentRoutes);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
