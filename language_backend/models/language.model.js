const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')

const Language = sequelize.define("language", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false
	},
	language: {
		type: DataTypes.STRING,
		allowNull: false
	},
	section: {
		type: DataTypes.INTEGER,
		defaultValue: 24
	}
}, { timestamps: false })

module.exports = Language
