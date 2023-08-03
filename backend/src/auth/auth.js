const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator")

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
                            res.json({ domain: "/main" ,session: session});
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
                            password: hashedPassword
                        });
                        return user.save();
                    })
                    .then(result => {
                        res.json({ domain: "/login" });
                    })
            }
        })
};

exports.postLogout = (req,res,next) => {
    req.session.destroy(() => {
        res.json({domain: "/login"});
    });
}


