const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('user', {
	UserId:{
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	UserName: {
		field: 'username',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'Name is required'
			},
			len: {
				args: [2, 20],
				msg: 'Name must be between 2 to 20 characters'
			}
		}
	},
	PassWord: {
		field: 'password',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'Password is required'
			},
			len: {
				args: [8, 20],
				msg: 'Password must be between 8 to 20 characters'
			}
		}
	}

}, {
	timestamps: false
});