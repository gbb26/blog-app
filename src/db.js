/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUrl = process.env.MONGODB_URI;

const connectDB = () => {
    mongoose.connect(mongoUrl)
        .then(() => console.log("connection created"))
        .catch((e) => console.log(e));
};

module.exports = connectDB;
