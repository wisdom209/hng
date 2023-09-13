const express = require('express')
require('dotenv').config()
const { sequelize, User } = require('./model/User')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000


/* post request */
app.post('/api', async (req, res) => {
	try {
		const { name } = req.body

		if (!name) return res.status(400).json({ error: "name field is required" })

		if (typeof name !== "string") return res.status(400).json({ error: "name field must be a string" })

		if (name.length < 1) return res.status(400).send({ error: "name field must have at least one character" })

		const user = await User.create({ name })

		return res.status(201).json(user.toJSON())

	} catch (e) {

		return res.status(500).json({ error: "internal server error" })
	}

})

/* get request */
app.get('/api/:user_id', async (req, res) => {
	try {
		const userId = req.params.user_id

		const user = await User.findByPk(userId)

		if (!user) return res.status(404).json({
			error: `name with this id ${userId} not found`
		})

		return res.status(200).json(user.toJSON())
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}

})

/* update request */
app.put('/api/:user_id', async (req, res) => {
	try {
		const userId = req.params.user_id
		const { name } = req.body;

		if (!name) return res.status(400).json({ error: "name field is required" })

		if (typeof name !== "string") return res.status(400).json({ error: "name field must be a string" })

		let user = await User.findByPk(userId)

		if (!user) return res.status(404).json({ error: `name with this id ${userId} not found` });

		user.set({ name })

		user = await user.save()

		return res.status(200).json(user.toJSON())
	} catch (e) {
		console.log(e)
		return res.status(500).json({ error: "internal server error" })
	}

})

/* delete request */
app.delete('/api/:user_id', async (req, res) => {
	try {
		const userId = req.params.user_id

		let user = await User.findByPk(userId)

		if (!user) return res.status(404).json({
			error: `name with this id ${userId} not found`
		})

		const objToDelete = { ...user }

		await user.destroy()

		return res.status(200).json(objToDelete.dataValues)
	} catch (e) {
		return res.status(500).json({ error: "internal server error" })
	}

})

sequelize.authenticate().then(() => {
	console.log("Database Connected")

	sequelize.sync()

	app.listen(PORT, () => {
		console.log("Server is now listening on port", PORT)
	})
})

module.exports = app


