
const Language = require('../models/language.model')

const responseHandler = require('../utils/responseHandler')

const createLanguage = async (req, res) => {
	try {
		const { userId, languages } = req.body;

		if (!Array.isArray(languages) || languages.length < 1) return responseHandler.badRequest(res, "language must be an array and not empty")

		if (!userId) return responseHandler.badRequest(res, "No userId given")

		languages.map(async (language) => {
			const languageExist = await Language.findOne({ where: { userId, language: language.toLowerCase() } })

			if (!languageExist) await Language.create({ userId, language: language.toLowerCase() })
		})

		return responseHandler.created(res, languages);

	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const getLanguages = async (req, res) => {
	try {
		const userId = req.params.userId;

		if (!userId) return responseHandler.badRequest(res, "No userId given")

		const languages = await Language.findAll({ where: { userId } })

		return responseHandler.success(res, languages);
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

const deleteLanguages = async (req, res) => {
	try {
		const userId = req.params.userId;

		console.log(userId)

		if (!userId) return responseHandler.badRequest(res, "No userId given");

		await Language.destroy({ where: { userId } })

		return responseHandler.success(res, [])
	} catch (error) {
		return responseHandler.serverError(res, error.message)
	}
}

module.exports = { createLanguage, getLanguages, deleteLanguages }
