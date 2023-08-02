const express = require('express');
const router = express.Router();
const bankController = require('../bank/bank');


router.get("/main", bankController.getMain);
router.post("/main", bankController.postMain);


module.exports = router;
