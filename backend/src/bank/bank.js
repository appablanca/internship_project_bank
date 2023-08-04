const User = require("../model/user");
const bcrypt = require("bcryptjs");
exports.getMain = (req, res, next) => {
    res.json({ email: "fetzi" });
};

exports.postMain = (req, res, next) => {

};

exports.getDeposit = (req, res, next) => {
    res.json({ email: "fetzi" });
};

exports.postDeposit = (req, res, next) => {
    const amount = parseInt(req.body.amount);
    const IBAN = req.body.IBAN;
    User.findOne({ IBAN: IBAN })
        .then(user => {
            if (user) {
                user.balance += amount;
                user.save();
                res.json({ domain: "/main", newBalance: user.balance });
            } else {
                res.json({ domain: "/deposit", message: "IBAN doesn't exist" });
            }
        })
};

exports.getTransfer = (req, res, next) => {
    res.json({ email: "fetzi" });
};

exports.postTransfer = (req, res, next) => {
    const throwIBAN = req.body.throwIBAN;
    const receiveIBAN = req.body.receiveIBAN;
    const amount = parseInt(req.body.amount);
    User.findOne({ IBAN: throwIBAN })
        .then(user => {
            if (user) {
                if (amount > user.balance) {
                    res.json({ domain: "/transfer",newBalance: user.balance })
                } else {
                    User.findOne({ IBAN: receiveIBAN })
                        .then(receiveUser => {
                            receiveUser.transferLog.transfers.push(
                                {
                                    sIBAN: user.IBAN,
                                    sNAME: user.name,
                                    amount: amount,
                                    rIBAN: receiveUser.IBAN,
                                    rNAME: receiveUser.name
                                }
                            )
                            user.transferLog.transfers.push(
                                {
                                    sIBAN: user.IBAN,
                                    sNAME: user.name,
                                    amount: amount,
                                    rIBAN: receiveUser.IBAN,
                                    rNAME: receiveUser.name
                                }
                            )
                            receiveUser.balance += amount;
                            user.balance -= amount;
                            user.save();
                            receiveUser.save();
                            res.json({ domain: "/main", newBalance: user.balance,newTransferLog: user.transferLog.transfers });
                        })
                }
            } else {
                res.json({ domain: "/transfer", message: "IBAN doesn't exist" });
            }
        })
};


