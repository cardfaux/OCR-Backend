const express = require('express');

const invoiceControllers = require('../controllers/invoice-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

//@ Route /api/invoice
//@ Method POST
router.post('/', fileUpload.single('image'), invoiceControllers.invoiceImage);

module.exports = router;
