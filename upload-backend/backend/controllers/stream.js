const path = require('path')
const fs = require('fs')
const responseHandler = require('../responseHandler')
const dbModel = require('../config/db')

let parentPath = path.join(__dirname, '..');
const static_path = path.join(parentPath, '/public')

const getLatestVideoPath = () => {
	const files = fs.readdirSync(static_path);
	if (files.length < 1) {
		throw new Error("No video to display");
	}

	const filearr = files.map(v => Number(v));
	const videoPath = static_path + "/" + `${Math.max(...filearr)}`;
	return videoPath;
};

const video = async (req, res) => {
	try {
		const range = req.headers.range;

		if (!range) return responseHandler.badRequest(res, "Requires range header")
		
		const videoPath = getLatestVideoPath();
		
		const videoSize = fs.statSync(videoPath).size;
		const chunkSize = 1024 * 1024 * 5;
		const start = Number(range.replace(/\D/g, ""))
		const end = Math.min(start + chunkSize, videoSize - 1);
		const contentLength = end - start + 1;

		const headers = {
			"Content-Range": `bytes ${start} - ${end}/${videoSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Pragma": "no-cache",
			"Expires": 0
		}

		if (start < end) {
			res.writeHead(206, headers);
			req.videoStream = fs.createReadStream(videoPath, { start, end });

			req.videoStream.pipe(res);
		} else {
			req.videoStream.close()
		}

	} catch (error) {
		console.log(error.message)
		return responseHandler.serverError(res, error.message)
	}
}

const stream = (req, res) => {
	const data = { message: "hello world", videoUrl: "http://localhost:3000/video" }
	return res.render('index.ejs', { data })
}

module.exports = { stream, video }