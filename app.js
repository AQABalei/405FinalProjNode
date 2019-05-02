const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Post = require('./models/post');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const app = express();

app.use(bodyParser.json());

User.hasMany(Post, {
	foreignKey: 'userid'
});

Post.belongsTo(User, {
	foreignKey: 'userid'
});

app.patch('/users/:id', function(request, response) {
	let { id } = request.params;
	User.update({
		UserName: request.body.name,
		PassWord: request.body.pw},
		{ where: { id: id} }
	)
	.then((user) => {
		console.log("user" + id);
		User.findByPk(id).then((user) => {
			if (user) {
				response.json(user);
			}else {
				response.status(404).send();
			}
		});
	}, (validation) => {
		console.log("validation" + validation);
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				}
			})
		});
	});
});

app.delete('/api/users/:id', function(request, response){
	let {id} = request.params;
	User
		.findByPk(id)
		.then((user) => {
		if(user){
			return user.setPosts([]).then(() => {
				return user.destroy();
			});
		}
		else{
			return Promise.reject();
		}
	})
	.then(() => {
		response.status(204).send();
	}, () => {
		response.status(404).send();
	});
});

app.post('/api/users', function(request, response){
	User.create({
		UserName: request.body.name,
		PassWord: request.body.pw
	}).then((user) => {
		response.json(user);
	}, (validation) => {
		console.log(validation)
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message 
				}
			})
		});
	});
});

åapp.get('/api/users', function(request, response){
	let filter = {};
	let { q } = request.query;
	if(q){
		filter = {
			where: {
				username: {
					[Op.like]: `${q}%`
				}
			}
		};
	}
	User.findAll(filter).then((users) => {
		response.json(users);
	});
});

app.get('/api/users/:id', function(request, response){
	let { id } = request.params;
	User.findByPk(id).then((user) => {
		if(user){
			response.json(user);
		}
		else{
			response.status(404).send();
		}
	});
});

app.listen(process.env.PORT || 8000);
