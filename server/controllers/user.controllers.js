const UserModel = require('../db/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateToken(user) {
	if (user.password) {
		delete user.password;
	}

	return jwt.sign(user, process.env.JWT_SECRET);
}

async function register({ username, email, password }) {
	const existed = await UserModel.findOne({ email });

	if (existed) {
		throw new Error('user is already existed with the given email');
	}

	password = bcryptjs.hashSync(password);

	let user = await UserModel.create({
		username,
		email,
		password,
	});

	user = user.toJSON();

	delete user.password;

	return user;
}

async function login({ email, password }) {
	const user = await UserModel.findOne({
		email: email,
	});

	if (!user) {
		throw new Error('user is not found with the given email');
	}

	const match = bcryptjs.compareSync(password, user.password);

	if (!match) {
		throw new Error('given password is wrong');
	}

	//generate token;

	return generateToken(user.toJSON());
}

module.exports = { register, login };
