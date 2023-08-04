const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require('body-parser');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
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
            const transfersL = JSON.stringify(resData.transfers);
            localStorage.setItem("IBANT" ,resData.IBAN);
            localStorage.setItem("NAMET",resData.name);
            localStorage.setItem("BALANCET",resData.balance);
            localStorage.setItem("TRANSFERST",transfersL);
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
        name: localStorage.getItem("NAMET")
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
            localStorage.clear();
            res.redirect(resData.domain)
        });
});




app.get("/main", async function (req, res) {
    const transferM = JSON.parse(localStorage.getItem("TRANSFERST"));

    const main = await fetch("http://localhost:8080/main")
        .then(res => {
            return res.json();
        })
        .then(resData => {
            res.render("../views/bank/main.ejs", {
                NAME: localStorage.getItem("NAMET"),
                BALANCE: localStorage.getItem("BALANCET"),
                IBAN: localStorage.getItem("IBANT"),
                TRANSFERS: transferM,
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
                NAME: localStorage.getItem("NAMET"),
                BALANCE: localStorage.getItem("BALANCET"),
                IBAN: localStorage.getItem("IBANT"),
                path: ""
            });
        });
});
app.post("/deposit", async function (req, res) {
    const depositData = {
        amount: req.body.amount,
        IBAN: localStorage.getItem("IBANT")
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
            localStorage.setItem("BALANCET",resData.newBalance);
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
                NAME: localStorage.getItem("NAMET"),
                BALANCE: localStorage.getItem("BALANCET"),
                IBAN: localStorage.getItem("IBANT"),
                path: ""
            });
        });
});
app.post("/transfer", async function (req, res) {

    const transferData = {
        throwIBAN: localStorage.getItem("IBANT"),
        receiveIBAN: req.body.IBAN,
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
            const newTransfers = JSON.stringify(resData.newTransferLog);
            localStorage.setItem("BALANCET",resData.newBalance);
            localStorage.setItem("TRANSFERST",newTransfers);
            res.redirect(resData.domain)
        });
})



app.listen(port, function (error) {
    if (error)
        throw error;
    else
        console.log("Server is running");
});