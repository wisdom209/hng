const express = require('express')
const path = require('path')
const router = express.Router()

const uploadController = require('../controllers/upload')
const streamController = require('../controllers/stream')


let parentPath = path.join(__dirname, '..');
const static_path  = path.join(parentPath, '/public')


const upload = require('../config/multer')(static_path)
const handleMulterError = require('../middleware/multerError')


router.get('/index', uploadController.uploadPage)

router.post('/upload', upload.single('video'), handleMulterError, uploadController.upload)

router.get('/stream/:videoPath', streamController.stream)

/* router.get('/video', streamController.video) */

module.exports = router
