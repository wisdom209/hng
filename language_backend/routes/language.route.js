const express = require('express')
const languageController = require('../controllers/language.controller')

const router = express.Router()

router.post('/createLanguage', languageController.createLanguage);
router.get('/getLanguages/:userId', languageController.getLanguages);
router.delete('/deleteLanguages/:userId', languageController.deleteLanguages)

module.exports = router
