const models = require('../models');

const create = async (req, res) => {
	try {
		const { firstName, lastName, description } = req.body;
		if (!firstName || !lastName) {
			return res.status(409).json({ error: 'firstName o lastName vacios!' });
		}

		const author = models.author({ firstName, lastName, description });
		await author.save();

		return res.status(201).json({ author });
	} catch (_) {
		return res.status(409).json({ error: 'Hubo un error al crear el author' });
	}
};

const getAll = async (req, res) => {
	try {
		const authors = await models.author.find();
		return res.json({ authors });
	} catch (_) {
		return res.json({ authors: [] });
	}
};

const get = async (req, res) => {
	try {
		const { id } = req.params;

		const author = await models.author.findById(id);
		const books = await models.book.find({ author: id });
		return res.json({ author, books });
	} catch (_) {
		return res.status(409).json({ error: 'Author no encontrado' });
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;

		const books = await models.book.find({ authors: id });
		for (book in books) {
			await models.book.findByIdAndRemove(book._id);
		}

		await models.author.findByIdAndRemove(id); //TODO: check it.
		// console.log({ res });
		// if (!res) {
		// 	return res.status(409).json(false);
		// }

		return res.json(true);
	} catch (_) {
		return res.status(409).json(false);
	}
};

const update = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, description } = req.body;

		const author = await models.author.findById(id);
		author.firstName = firstName;
		author.lastName = lastName;
		author.description = description;

		await author.save();

		return res.json({ author });
	} catch (err) {
		console.log({ err });
		return res.status(409).json({ error: err.message });
	}
};

module.exports = {
	create,
	getAll,
	get,
	remove,
	update,
};
