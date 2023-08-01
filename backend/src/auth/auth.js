const User = require("../model/user");
const { validationResult } = require("express-validator")

exports.getLogin = (req,res,next) => {
    res.json("login");
}
exports.postLogin = (req,res,next) => {
    const loginData = {
        success: true,
        statusCode: 200,
        message: 'User (name:' + req.body.email + ') insert has been completed successfully'
    }
    res.json(loginData);
}
exports.getSignup = (req, res, next) => {
    res.json("signup");
};

exports.postSignup = (req, res, next) => {
    const data = {
        success: true,
        statusCode: 200,
        message: 'User (name:' + req.body.name + ') insert has been completed successfully'
    }
    res.json(data);
}
