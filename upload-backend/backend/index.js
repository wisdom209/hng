const express = require('express')
const cors = require('cors')
const fs = require('fs')
const router = require('./routes/router')
const { sequelize } = require('./config/db')

const app = express()
const port = process.env.PORT || 3000
const static_path = `${__dirname}/public`


app.set('view engine', 'ejs')
app.use(express.json())
app.use(cors())
app.use(router)

/* MAKE DIRECTORY FOR HOLDING STATIC FILES*/
if (!fs.existsSync(static_path)) fs.mkdirSync(static_path)
app.use(express.static(static_path))

sequelize.authenticate().then(async () => {
	await sequelize.sync({ force: false })
	app.listen(port, () => {
		console.log("server listening on port", port)
	})
})


module.exports = { static_path }
