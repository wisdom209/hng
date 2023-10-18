const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()


const app = express()
const { sequelize } = require('./config/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

const languageRouter = require('./routes/language.route')
app.use(languageRouter)

const PORT = process.env.PORT || 4001
sequelize.authenticate().then(async () => {
	await sequelize.sync({ force: false })
	console.log("Database connected")

	app.listen(PORT, () => {
		console.log("Server running on port", PORT);
	})
})
