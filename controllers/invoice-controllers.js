const HttpError = require('../models/http-error');
const fs = require('fs');

const { createWorker } = require('tesseract.js');

const worker = createWorker({
	logger: (m) => console.log(m) // Add logger here
});

//@ Route /api/invoice
//@ Method POST
const invoiceImage = (req, res, next) => {
	console.log(req.file);

	if (req.file) {
		fs.readFile(`./uploads/images/${req.file.filename}`, (err, data) => {
			if (err) return console.log('This Is Your Error', err);

			(async () => {
				await worker.load();
				await worker.loadLanguage('eng');
				await worker.initialize('eng');
				const {
					data: { text }
				} = await worker.recognize(data);
				console.log(text);
				await worker.terminate();
			})();
		});
	}
};

exports.invoiceImage = invoiceImage;
