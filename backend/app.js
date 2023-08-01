const mongoose = require("mongoose");
const MONGODB_URI ="mongodb+srv://feyzieren:f8wjV80YPIP9vbIg@cluster0.jxeprcj.mongodb.net/bank?retryWrites=true&w=majority";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const app = express(); 
const bankRoutes = require("./src/routes/bank.js");
const authRoutes = require("./src/routes/auth.js")


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use(bankRoutes);
app.use(authRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result=> {
        app.listen(8080);
    })


