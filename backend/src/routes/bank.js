const express = require('express');
const router = express.Router();
const bankController = require('../bank/bank');


router.get('/', bankController.getIndex);

module.exports = router;
