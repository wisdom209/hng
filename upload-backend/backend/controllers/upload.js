const responseHandler = require('../responseHandler')
const dbModel = require('../config/db')
const path = require('path')
const fs = require('fs');
const axios = require('axios');
const { Deepgram } = require('@deepgram/sdk')

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
		const id = req.params.id;
		const mimetype = "video/mp4"
		const deepgram = new Deepgram(process.env.deepgram_key)
		const file = `${static_path}/${id}`

		const audio = fs.readFileSync(file)
		const source = { buffer: audio, mimetype }

		deepgram.transcription.preRecorded(source, {
			smart_format: true,
			model: 'nova'
		}).then(response => {
			res.setHeader('Content-Type', 'application/json')
			return res.json(response)
			console.dir(response, { depth: null })
		}).catch((err) => {
			return responseHandler.notFound(res, "not translated")
		})

	} catch (error) {
		console.log(error.message)
		return responseHandler.serverError(res, error)
	}
}


module.exports = { uploadPage, upload, upload2, transcribe }
1
