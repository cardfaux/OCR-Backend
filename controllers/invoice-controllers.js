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

			let loadedImage = async () => {
				try {
					await worker.load();
					await worker.loadLanguage('eng');
					await worker.initialize('eng');
					const {
						data: { text }
					} = await worker.recognize(data);
					// console.log(text);
					// console.log(typeof text);
					// let split = text.split(' ');
					// console.log(split);
					let invoiceRegex = /#[\d]+/gi;
					let invoiceNum = invoiceRegex.exec(text);
					let invoiceNumber = invoiceNum[0];
					console.log(invoiceNumber);
					await worker.terminate();
				} catch (error) {
					console.log(error);
				}
			};
			loadedImage();

			//loadedImage();

			// let stringImage = new String(loadedImage());
			// console.log(stringImage);

			// let stringImage = loadedImage.toString();
			// let splitText = stringImage.split(' ');
			// console.log(splitText);
		});
	}
};

exports.invoiceImage = invoiceImage;
