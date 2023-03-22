const express = require('express');
const { register, login } = require('../controllers/user.controllers');

const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
	const body = req.body;

	try {
		const data = await register(body);
		return res.status(200).send(data);
	} catch (error) {
		return res.status(200).send({ error: error.message });
	}
});

userRoute.post('/login', async (req, res) => {
	const body = req.body;
	try {
		const token = await login(body);
		return res.status(200).send({token});
	} catch (error) {
		return res.status(200).send({ error: error.message });
	}
});


module.exports = userRoute