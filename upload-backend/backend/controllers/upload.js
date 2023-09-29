const responseHandler = require('../responseHandler')
const path = require('path')

const uploadPage = (req, res) => {
	try {
		const data = { message: "Streaming . . ." }
		return res.render('upload', { data })
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const upload = (req, res) => {
	try {
		if (!req.file) return responseHandler.badRequest(res, "No file uploaded")

		const data = { message: "hello world", videoUrl: `http://localhost:3000/video` }

		return res.render('index', { data })
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}

}

module.exports = { uploadPage, upload }
