const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './sqlite.db'
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
		allowNull: false
	},
	original_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
})

module.exports = { sequelize, video };
