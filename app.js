const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const invoiceRoutes = require('./routes/invoice-routes');

const app = express();
const PORT = 5000 || process.env.PORT;

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

// Connection To The DataBase And Starting The Server...
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chatterbox-duf9f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
	)
	.then(() => {
		app.listen(PORT, () => console.log(`API IS RUNNING ON PORT ${PORT}.....`));
	})
	.then(() => {
		console.log('MongoDB Connected.....');
	})
	.catch((error) => {
		console.log(error);
	});
// Connection To The DataBase And Starting The Server...
