const fs = require('fs')
const { static_path } = require('../index')
const responseHandler = require('../responseHandler')

const clear_storage = (req, res, next) => {
	try {
		fs.readdir(static_path, (err, files) => {
			if (err) return responseHandler.serverError(res, err)

			files.forEach(file => {
				if (file.endsWith('.mp4'))
					fs.unlinkSync(static_path + '/' + file)
			})
			next()
		})

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

module.exports = clear_storage
