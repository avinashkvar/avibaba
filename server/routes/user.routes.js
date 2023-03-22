const express = require('express');
const { register, login } = require('../controllers/user.controllers');

const userRoute = express.Router();

userRoute.get('/user/loginUser', (req, res) => {
	const authorization = req.headers.authorization;

	if (authorization) {
		let token = authorization.split(' ').pop();
		try {
			if (token) {
				jwt.verify(token, process.env.JWT_SECRET);

				const user = jwt.decode(token);
				return res.send(user);
			} else {
				return res.status(200).send({ error: 'invalid token provided' });
			}
		} catch (error) {
			return res.status(200).send({error});
		}
	} else {
		return res.status(200).send({ error: 'no token provided' });
	}
});

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