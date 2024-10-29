const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('./conn');
require('dotenv').config();
app.use(express.json());

const userRoutes = require('./Router/api-routes');
app.use('/api', userRoutes);
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 8080;

app.listen(port, function(err) {
    if (err) {
        console.error('Server connection failed:', err);
    } else {
        console.log('Server connection established on port -', port);
    }
});

