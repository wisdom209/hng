const { Sequelize, DataTypes } = require('sequelize')
const pg = require('pg')

let sequelize = null;

if (process.env.DB) {
    sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database:  process.env.DB,
	dialectModule: pg,
	//logging: false
});
} else {
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: './database/sqlite3'
	})
}

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { timestamps: false })

module.exports = { sequelize, User }
