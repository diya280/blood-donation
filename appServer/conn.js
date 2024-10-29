const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/bloodDonate';  

console.log('Attempting to connect to MongoDB...', url);

async function databaseConnection() {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connection established');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
}

databaseConnection(); 

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + url);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = mongoose;


