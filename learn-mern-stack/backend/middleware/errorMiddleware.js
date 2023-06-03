// By default express handles errors and returns a HTML body. We are modifying it to not do that.
const errorHandler = (err, request, response, next) => {
	const statusCode = response.statusCode ? response.statusCode : 500;
	response.status(statusCode);
	response.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
	next(); // this is necessary, without this, the requests would not be forwarded.
};

module.exports = { errorHandler };
