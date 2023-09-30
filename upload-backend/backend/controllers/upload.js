const responseHandler = require('../responseHandler')
const path = require('path')
const fs = require('fs')

let parentPath = path.join(__dirname, '..');
const static_path = path.join(parentPath, '/public')

const getLatestVideoPath = () => {
	const files = fs.readdirSync(static_path);
	if (files.length < 1) {
		throw new Error("No video to display");
	}

	const filearr = files.map(v => Number(v));
	const videoPath = `${Math.max(...filearr)}`;
	return videoPath;
};

const uploadPage = (req, res) => {
	try {
		const data = { message: "Streaming . . ." }
		return res.render('upload', { data })
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const upload = async (req, res) => {
	try {
		if (!req.file) return responseHandler.badRequest(res, "No file uploaded")

		const videoPath = getLatestVideoPath()

		return res.redirect(`/stream/${videoPath}`)

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}

}

module.exports = { uploadPage, upload }
