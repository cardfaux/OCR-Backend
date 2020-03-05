const express = require('express');

const invoiceControllers = require('../controllers/invoice-controllers');

const router = express.Router();

//@ Route /api/invoice
//@ Method POST
router.post('/', invoiceControllers.invoiceImage);

module.exports = router;
