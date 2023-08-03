const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res, next) => {
    res.json("login");
}
exports.postLogin = (req, res, next) => {
    const session = req.session.isLoggedIn = true;
    const emailL = req.body.email;
    const passwordL = req.body.password;
    User.findOne({ email: emailL })
        .then(user => {
            if (user) {
                bcrypt
                    .compare(passwordL, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            console.log("login success");

                            res.json({
                                domain: "/main",
                                email: user.email,
                                name: user.name,
                                IBAN: user.IBAN,
                                balance: user.balance,
                                transfers: user.transferLog.transfers
                            });
                        } else {
                            res.json({ domain: "/login" });
                        };
                    });
            } else {
                res.json({ domain: "/login" });
            }

        });
};


exports.getSignup = (req, res, next) => {
    res.json("signup");
};

exports.postSignup = (req, res, next) => {
    const emailS = req.body.email;
    const nameS = req.body.name;
    const passwordS = req.body.password;
    User.findOne({ email: emailS })
        .then(user => {
            if (user) {
                res.json({ domain: "/signup" });
            } else {
                bcrypt
                    .hash(passwordS, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            email: emailS,
                            name: nameS,
                            IBAN: (Math.floor(100000 + Math.random() * 900000)),
                            balance: 0,
                            password: hashedPassword,
                            transferLog: { transfers: [] }
                        });
                        return user.save();
                    })
                    .then(result => {
                        res.json({ domain: "/login" });
                    })
            }
        })
};

exports.postLogout = (req, res, next) => {
    res.json({ domain: "/login" });
}


