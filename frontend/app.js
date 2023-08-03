const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/" , (req,res,next) => {
    res.redirect("/login");
})


app.get('/login', async function (req, res) {
    const testing = await fetch('http://localhost:8080/login')
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/auth/loginT.ejs", {
                path: "/loginT",
                pageTitle: "login",
                oldInput: {
                    email: "",
                    password: ""
                },
                validationErrors: []
            });
        });

});

app.post("/login", async function (req, res) {
    const loginData = {
        email: req.body.email,
        password: req.body.password
    }
    const login = await fetch(
        "http://localhost:8080/login",
        {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
})

app.get("/signup", async function (req, res) {
    const signup = await fetch("http://localhost:8080/signup")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/auth/signupT.ejs", {
                path: "/signup",
                pageTitle: "Signup",
                oldInput: {
                    email: "",
                    name: "",
                    password: "",
                    confirmPassword: ""
                },
                validationErrors: []
            });
        });
});

app.post("/signup", async function (req, res) {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    const singup = await fetch(
        "http://localhost:8080/signup",
        {
            method: 'POST',
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
})

app.post("/logout", async function (req, res) {
    const data = {
        session: req.body.session
    }
    const logout = await fetch("http://localhost:8080/logout", {
        method: 'POST',
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
});




app.get("/main", async function (req, res) {
    const main = await fetch("http://localhost:8080/main")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/bank/main.ejs", {
                email: resData.email,
                name: resData.name,
                path: ""
            });
        });
});
app.get("/deposit", async function (req, res) {
    const main = await fetch("http://localhost:8080/deposit")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/bank/deposit.ejs", {
                path: ""
            });
        });
});
app.post("/deposit", async function (req, res) {
    const depositData = {
        amount: req.body.amount
    }

    const deposit = await fetch(
        "http://localhost:8080/deposit",
        {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(depositData)
        })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
})
app.get("/transfer", async function (req, res) {
    const main = await fetch("http://localhost:8080/transfer")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/bank/transfer.ejs", {
                email: resData.email,
                path: ""
            });
        });
});
app.post("/transfer", async function (req, res) {
    const transferData = {
        IBAN: req.body.IBAN,
        amount: req.body.amount
    }
    const deposit = await fetch(
        "http://localhost:8080/transfer",
        {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transferData)
        })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
})
app.get("/details", async function (req, res) {
    const main = await fetch("http://localhost:8080/details")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/bank/details.ejs", {
                email: resData.email,
                path: ""
            });
        });
});
app.post("/details", async function (req, res) {
    const deposit = await fetch(
        "http://localhost:8080/details",
        {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transferData)
        })
        .then(res => {
            return res.json()
        }).then(resData => {
            res.redirect(resData.domain)
        });
})


app.listen(port, function (error) {
    if (error)
        throw error;
    else
        console.log("Server is running");
});