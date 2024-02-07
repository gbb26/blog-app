/* eslint-disable no-undef */
const connectDB = require("./db");
const express = require('express');
const api = require('./routes/index');
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");

dotenv.config();

const port = process.env.PORT;
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", api);

module.exports = {
    app,
    port
};