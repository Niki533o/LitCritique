const express = require('express');
const bodyParser = require('body-parser');
const db = require("./firebase");
const cors = require('cors');
require('dotenv').config();
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
app.use('/auth', authRoutes);
app.use('/reviews', reviewsRoutes); 

module.exports = app;