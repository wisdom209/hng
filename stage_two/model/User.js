const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database/db.sqlite',
	logging: false,
})

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false })

module.exports = { sequelize, User }
