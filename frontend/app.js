const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 3000;

app.get('/', async function (req, res) {
    const testing = await fetch('http://localhost:8080/').then(res => {
        return res.json();
    }).then(resData => {
        res.render('../views/shop/index.ejs', { name: resData });
    });

});

app.listen(port, function (error) {
    if (error)
        throw error;
    else
        console.log("Server is running");
});