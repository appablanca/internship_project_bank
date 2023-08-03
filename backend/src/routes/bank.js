const express = require('express');
const router = express.Router();
const bankController = require('../bank/bank');


router.get("/main", bankController.getMain);
router.post("/main", bankController.postMain);
router.get("/deposit", bankController.getDeposit);
router.post("/deposit", bankController.postDeposit);
router.get("/transfer", bankController.getTransfer);
router.post("/transfer", bankController.postTransfer);




module.exports = router;
