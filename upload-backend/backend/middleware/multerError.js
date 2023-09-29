const multer = require('multer')
const responseHandler = require('../responseHandler')

const handleMulterError = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return responseHandler.badRequest(res, err.message)
	}
	next()
}

module.exports = handleMulterError
