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

			let savedFile = await video.create({
				original_name: file.originalname,
				name: file.originalname + '_' + uuid.v4()
			})
			
			cb(null, `${savedFile.dataValues.id}`)
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

	return upload;
}

module.exports = multerSetup;
