const express = require('express');
const router = express.Router();
const bankController = require('../bank/bank');


router.get("/main", bankController.getMain);


module.exports = router;
