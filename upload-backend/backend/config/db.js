const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './sqlite.db',
	logging: false
})

const video = sequelize.define('Video', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
	},
	transcript: {
		type: DataTypes.TEXT
	}
})

module.exports = { sequelize, video };
