const expect = require("chai").expect;
const assert = require("chai").assert;
const User = require("./../../models/user");
const Post = require("./../../models/post");

describe("users", function(){
	describe("UserName", function(){
		it("should be at least 2 char", async () => {
			try{
				let user = new User({UserName: 'a', PassWord: "okokokok"});
				await user.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Name must be between 2 to 20 characters');
			}
		});

		it("should be required", async () => {
			try{
				let user = new User({UserName: '', PassWord: "okokokok"});
				await user.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Name is required');
			}
		});
	});
	describe("PassWord", function(){
		it("should be at least 8 char", async () => {
			try{
				let user = new User({UserName: 'abc', PassWord: "1"});
				await user.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Password must be between 8 to 20 characters');
			}
		});

		it("should be required", async () => {
			try{
				let user = new User({UserName: 'alex12138', PassWord: ""});
				await user.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Password is required');
			}
		});
	});
});

describe("users", function() {
	describe("Title", function(){
		it("should be at required", async () => {
			try{
				let post = new Post({PostTitle: '', PostDest: "Romania"});
				await post.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Title is required');
			}
		});
	});

	describe("Destination", function(){
		it("should be at required", async () => {
			try{
				let post = new Post({PostTitle: 'temp title', PostDest: ""});
				await post.validate();
			}
			catch(error){
				expect(error.errors[0].message).to.equal('Destination is required');
			}
		});
	});
});