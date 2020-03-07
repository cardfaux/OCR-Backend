const HttpError = require('../models/http-error');
const fs = require('fs');

const { createWorker } = require('tesseract.js');

const worker = createWorker({
	logger: (m) => console.log(m) // Add logger here
});

// @type -- POST
// @path -- /api/invoice
// @desc -- path to submit invoice to tesseract
const invoiceImage = async (req, res, next) => {
	let invoiceNumber;
	let results;
	try {
		results = fs.readFile(
			`./uploads/images/${req.file.filename}`,
			async (err, data) => {
				if (err) return console.log('This Is Your Error', err);

				let loadedImage = async () => {
					await worker.load();
					await worker.loadLanguage('eng');
					await worker.initialize('eng');
					const {
						data: { text }
					} = await worker.recognize(data);
					let invoiceRegex = /#[\d]+/gi;
					let invoiceNum = invoiceRegex.exec(text);
					invoiceNumber = invoiceNum[0];
					console.log(invoiceNumber);
					await worker.terminate();

					await Promise.all(invoiceNumber);
					return invoiceNumber;
				};

				let test = loadedImage();
				// Test Is A Pending Promise
				return test;
			}
		);
	} catch (err) {
		const error = new HttpError(
			'Image Upload Failed, Please Try Again....',
			500
		);
		return next(error);
	}

	res.json({ invoiceNumber: results });
};

exports.invoiceImage = invoiceImage;
