const HttpError = require('../models/http-error');

//@ Route /api/invoice
//@ Method POST
const invoiceImage = (req, res, next) => {
	console.log('invoiceImageController');
	res.json({ message: 'it works' });
};

exports.invoiceImage = invoiceImage;
