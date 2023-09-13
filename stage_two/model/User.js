const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database:  process.env.DB,
	logging: false
});

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
