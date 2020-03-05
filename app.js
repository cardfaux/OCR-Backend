const fs = require('fs');
const path = require('path');
const express = require('express');

const invoiceRoutes = require('./routes/invoice-routes');

const app = express();

app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// CORS Middleware to attatch to every response
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});
// CORS Middleware to attatch to every response

app.use('/api/invoice', invoiceRoutes);

// Error Handling Routes And MiddleWare
app.use((req, res, next) => {
	const error = new HttpError('Could Not Find This Route', 404);
	throw error;
});

app.use((error, req, res, next) => {
	// Rollback File Upload If We Get An Error
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}
	if (res.headersSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An Unknown Error Occurred' });
});
// Error Handling Routes And MiddleWare

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => `I Am Running On Port ${PORT}`);
