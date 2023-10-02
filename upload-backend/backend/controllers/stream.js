const path = require('path')
const fs = require('fs')
const responseHandler = require('../responseHandler')
const dbModel = require('../config/db')
let parentPath = path.join(__dirname, '..');
const static_path = path.join(parentPath, '/public')

const stream = async (req, res) => {
	try {
		const videoPath = req.params.videoPath;

		if (!fs.existsSync(`${static_path}/${videoPath}`)) return responseHandler.notFound(res, "Video not in file system")

		const videos = await dbModel.video.findAll()

		const currentVideo = await dbModel.video.findByPk(videoPath)

		if (!currentVideo) return responseHandler.notFound(res)

		const data = { videos, message: "Streaming ", videoUrl: `${req.protocol}://${req.get('host')}/${videoPath}`, currentVideo }

		return res.render('index.ejs', { data })
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const stream2 = async (req, res) => {
	try {
		const videoPath = req.params.videoPath;

		if (!fs.existsSync(`${static_path}/${videoPath}`)) return responseHandler.notFound(res, "Video not in file system")

		const videos = await dbModel.video.findAll()

		const currentVideo = await dbModel.video.findOne({ name: videoPath })

		if (!currentVideo) return responseHandler.notFound(res)

		const data = { videos, message: "Streaming ", videoUrl: `${req.protocol}://${req.get('host')}/${videoPath}`, currentVideo }

		return res.render('index.ejs', { data })
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

module.exports = { stream, stream2 }

