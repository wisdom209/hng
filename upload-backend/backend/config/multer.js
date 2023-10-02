const multer = require('multer')
const uuid = require('uuid')
const { video } = require('./db')

/* SETUP MULTER */
const multerSetup = (static_path) => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, static_path)
		},
		filename: async (req, file, cb) => {

			let id = req.params.videoId;

			console.log(id)

			let savedFile = await video.create({
				original_name: file.originalname,
				name: id
			})

			savedFile.name = `${savedFile.dataValues.id}-${file.originalname}`

			savedFile = await savedFile.save()

			cb(null, `${savedFile.dataValues.id}`)
		}
	})

	const upload = multer({
		storage,
		limits: {
			fileSize: 1024 * 1024 * 400
		},
		fileFilter: (req, file, cb) => {
			console.log("my file type", file.mimetype)
			cb (null, true)
		}
	})

	return upload;
}

module.exports = multerSetup;
