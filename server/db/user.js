const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		username: String,
		email: String,
		password: String,
	},
	{
		timestamps: true,
	},
);

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel;