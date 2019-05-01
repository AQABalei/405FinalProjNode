const frisby = require('frisby');
const { Joi } = frisby;

it("should return 404 status when the user is not found", () => {
	return frisby
		.get("http://localhost:8000/api/users/-1")
		.expect('status', 404)
});

it("should return 200 status when the user is found", () => {
	return frisby
		.get("http://localhost:8000/api/users/1")
		.expect('status', 200)
});

it("should return 200 status when users are found", () => {
	return frisby
		.get("http://localhost:8000/api/users")
		.expect('status', 200)
});

it("should return 404 status when the user is not found when patching", () => {
	return frisby
		.patch("http://localhost:8000/tracks/-1")
		.expect('status', 404)
});

it("should return 200 status when updating a user successfully", () => {
	return frisby
	    .fetch('http://localhost:8000/users/1', {
	      method: 'PATCH',
	      body: JSON.stringify({
	        name: 'Test changed name1',
	        pw: 'ok123456'
	      })
	    })
	    .expect('json', 'UserName', 'Test changed name1')
	    .expect('status', 200);
});

it("should create a user", () => {
	return frisby
		.post('http://localhost:8000/api/users', {
			name: 'Test create name3',
			pw: 'testpassword'
		})
		.expect('json', 'UserName', 'Test create name3')
		.expect('status', 200);
});

it("should not create a user", () => {
	return frisby
		.post('http://localhost:8000/api/users', {
			name: '1',
			pw: 'testpassword'
		})
		.expect('json', "errors[0].message", "Name must be between 2 to 20 characters")
		.expect('status', 422);
});

it("should return 404 when delete user does not exist", () => {
	return frisby
		.del("http://localhost:8000/api/users/-1")
		.expect('status', 404);
});

it("should return 204 when delete user exists", () => {
	return frisby
		.del("http://localhost:8000/api/users/6")
		.expect('status', 204);
});





