const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('post', {
	PostId:{
		field: 'id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	PostTitle: {
		field: 'title',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'Title is required'
			},
			len: {
				args: [2, 20],
				msg: 'Title must be between 2 to 20 characters'
			}
		}
	},
	PostDest: {
		field: 'destination',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'Destination is required'
			}
		}
	}

}, {
	timestamps: false
});