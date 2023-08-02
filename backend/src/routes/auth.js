const express = require('express');
const router = express.Router();
const authController = require('../auth/auth');
const { check, body } = require('express-validator');

router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);
router.post('/signup', authController.postSignup);
router.post("/login", authController.postLogin);



module.exports = router;
