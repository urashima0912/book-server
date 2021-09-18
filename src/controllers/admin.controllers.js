const models = require('../models');
const helpers = require('../helpers');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signUp = async (req, res) => {
	try {
		const { email, password1, password2 } = req.body;

		if (!email || !password1 || !password2 || password1 !== password2) {
			return res.status(409).json({ error: 'Email or password incorrect!!' });
		}
		const hash = await helpers.bcrypt.encrypt(password1);
		const admin = models.admin({ email, password: hash });
		await admin.save();
		return res.status(201).json({ admin });
	} catch (err) {
		return res.status(409).json({ error: 'Hubo un error en tu request' });
	}
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(409).json({ error: 'Email or password incorrect!!' });
		}

		const admin = await models.admin.findOne({ email });
		if (!admin) {
			return res.status(409).json({ error: 'Usuario no existe!' });
		}

		const isValid = await helpers.bcrypt.compare(password, admin.password);
		if (!isValid) {
			return res.status(409).json({ error: 'Password invalido!' });
		}

		const token = jwt.sign({ admin }, config.jwt.secret);

		return res.status(200).json({ token });
	} catch (err) {
		return res.status(409).json({ error: 'hubo un error!' });
	}
};

const logout = (req, res) => {
	return res.json('logout');
};

module.exports = {
	signUp,
	signIn,
	logout,
};
