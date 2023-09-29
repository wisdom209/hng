const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const responseHandler = require('./responseHandler')

const app = express()
const port = process.env.PORT || 3000
const static_path = `${__dirname}/public`

/* SETUP MULTER */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, static_path)
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '_' + file.originalname)
	}
})

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 400
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith('video')) {
			cb(null, true)
		} else {
			cb(new Error("Invalid file type"))
		}
	}
})


app.use(express.json())
app.use(cors())

/* MAKE DIRECTORY FOR HOLDING STATIC FILES*/
if (!fs.existsSync(static_path)) fs.mkdirSync(static_path)

app.use(express.static(static_path))


/* SETUP MIDDLEWARES */

const handleMulterError = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return responseHandler.badRequest(res, err.message)
	}
	next()
}

const clear_storage = (req, res, next) => {
	try {
		fs.readdir(static_path, (err, files) => {
			if (err) return responseHandler.serverError(res, err)

			files.forEach(file => {
				fs.unlinkSync(static_path + '/' + file)
			})
			next()
		})

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

/* SETUP CONTROLLERS */
app.get('/', (req, res) => {
	try {
		return responseHandler.success(res, "Server is up and running")
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}

})

app.post('/upload', clear_storage, upload.single('image'), handleMulterError, (req, res) => {
	try {
		if (!req.file) return responseHandler.badRequest(res, "No file uploaded")

		return responseHandler.success(res, "File Uploaded")
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}

})

app.get('/video', async (req, res) => {
	try {
		const range = req.headers.range;

		if (!range) return responseHandler.badRequest(res, "Requires range header")

		fs.readdir(static_path, (err, files) => {
			if (err) return responseHandler.serverError(res, err)

			if (files.length < 1) return responseHandler.serverError(res, "No video to display")

			const videoPath = static_path + "/" + files[0]

			const videoSize = fs.statSync(videoPath).size;
			const chunkSize = 1024 * 1024 * 5;
			const start = Number(range.replace(/\D/g, ""))
			const end = Math.min(start + chunkSize, videoSize - 1);
			const contentLength = end - start + 1;

			const headers = {
				"Content-Range": `bytes ${start} - ${end}/${videoSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": contentLength,
				"Content-Type": "video/mp4"
			}

			res.writeHead(206, headers)

			const videoStream = fs.createReadStream(videoPath, { start, end })

			videoStream.pipe(res)
		})

	} catch (error) {
		console.log(error.message)
		return responseHandler.serverError(res, error.message)
	}
})


/* LISTEN FOR EVENTS */
app.listen(port, () => {
	console.log("server listening on port", port)
})

