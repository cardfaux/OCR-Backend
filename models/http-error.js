class HttpError extends Error {
	constructor(message, errorCode) {
		super(message); // Adds A Message Property
		this.code = errorCode; // Adds A 'code' property
	}
}

module.exports = HttpError;
