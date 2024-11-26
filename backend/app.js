const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://feyzieren:pMaeWvk54Obd0hAR@cluster0.fbgwj.mongodb.net/";
const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const path = require("path")

const app = express();
const store = new mongodbStore({
    uri: MONGODB_URI,
    collection: "sessions"
});
const bankRoutes = require("./src/routes/bank.js");
const authRoutes = require("./src/routes/auth.js");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secretsecret", resave: false, saveUninitialized: false, store: store }));

app.use(bankRoutes);
app.use(authRoutes);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(8000);
    })


