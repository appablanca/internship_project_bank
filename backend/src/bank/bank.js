const User = require("../model/user");
const bcrypt = require("bcryptjs");
exports.getMain = (req, res, next) => {
    res.json({email:"fetzi"});
};

exports.postMain = (req,res,next) => {
    
};

exports.getDeposit = (req,res,next) => {
    res.json({email:"fetzi"});
};

exports.postDeposit = (req,res,next) => {
    const amount = req.body.amount;
    console.log(amount);
    res.json({domain: "/main"});
};

exports.getTransfer = (req,res,next) => {
    res.json({email:"fetzi"});
};

exports.postTransfer = (req,res,next) => {
    const IBANT=  req.body.IBAN;
    const amount = req.body.amount;
    console.log(amount);
    console.log(IBANT);
    User.findOne({IBAN:IBANT})
        .then(user => {
            if(user){
                user.balance += amount;
                user.save();
                res.json({domain: "/main",message: "transfer success"});
            }else {
                res.json({domain: "transfer",message: "IBAN doesn't exist"});
            }
        })
};


