const badRequest = (res, data) => {
	return res.status(400).json({
		status: 400,
		error: "Bad Request",
		message: data
	})
}

const serverError = (res, data) => {
	return res.status(500).json({
		status: 500,
		error: "Internal Server Error",
		message: data
	})
}
const notFound = (res, data) => {
	return res.status(404).json({
		status: 404,
		error: "Not found",
		message: data
	})
}
const success = (res, data) => {
	return res.status(200).json({
		status: 200,
		message: "Success",
		data
	})
}

module.exports = {notFound, badRequest, success, serverError}
