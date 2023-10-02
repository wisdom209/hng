const responseHandler = require('../responseHandler')
const dbModel = require('../config/db')
const path = require('path')
const fs = require('fs');
const axios = require('axios');

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

const videoChunk = {}

const upload = async (req, res) => {
	try {
		console.log(req.file, "undef")
		console.log(req.body)

		if (!req.file) return responseHandler.badRequest(res, "No file uploaded")

		const videoPath = getLatestVideoPath()

		console.log(videoPath)
		return res.redirect(`/stream/${videoPath}`)

	} catch (error) {
		console.log('error', error)
		return responseHandler.serverError(res, error.message)
	}
}

const upload2 = async (req, res) => {
	try {
		let id = req.params.id

		await dbModel.video.findOrCreate({ where: { name: id } })

		fs.createWriteStream(`${static_path}/${id}`, { flags: 'a' }).write(req.body)

		return res.redirect(`/stream2/${id}`)

	} catch (error) {
		console.log('error', error)
		return responseHandler.serverError(res, error.message)
	}
}

const transcribe = async (req, res) => {
	try {
		return responseHandler.success(res, "ok")

	} catch (error) {
		return responseHandler.serverError(res, error)
	}
}


module.exports = { uploadPage, upload, upload2, transcribe }
