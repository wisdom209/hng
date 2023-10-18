const success = (res, data) => {
	return res.status(200).json({
		status: 200,
		message: 'success',
		data: data,
	});
};

const created = (res, data) => {
	return res.status(201).json({
		status: 201,
		message: 'Resource created',
		data: data,
	});
};

const badRequest = (res, data) => {
	return res.status(400).json({
		status: 400,
		error: 'Bad Request',
		message: data,
		data: null,
	});
};

const serverError = (res, data) => {
	return res.status(500).json({
		status: 500,
		error: 'Internal server error',
		message: data,
		data: null,
	});
};

const notFound = (res, data) => {
	return res.status(404).json({
		status: 404,
		error: 'Resource not found',
		message: data,
		data: null,
	});
};

module.exports = {
	success,
	badRequest,
	serverError,
	created,
	notFound,
};
