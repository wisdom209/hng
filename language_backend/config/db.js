const { Sequelize, DataTypes } = require('sequelize')
const pg = require('pg')

const sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
	dialectModule: pg,
	logging: false
});


module.exports = {sequelize };
