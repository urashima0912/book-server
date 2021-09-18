const models = require('../models');
const uuid = require('uuid');

const create = async (req, res) => {
	try {
		console.log({ body: req.body });
		const { isbn, title, authorId } = req.body;

		const photo = req.files.photo;
		const pathList = __dirname.split('\\');

		pathList.pop();
		const pathStatic = pathList.join('/') + '/static';
		const name = uuid.v4() + '.png';
		const finalPath = pathStatic + '/' + name;

		photo.mv(finalPath, (err) => {
			if (err) {
				return res.status(409).json({ error: 'Hubo un error al crear imagen' });
			}
		});

		const author = await models.author.findById(authorId);
		if (!author) {
			return res.status(409).json({ error: 'Author no existe' });
		}

		const book = models.book({
			isbn,
			title,
			author: authorId,
			photo: 'http://localhost:4500/' + name,
		});
		await book.save();

		return res.status(201).json({ book });
	} catch (_) {
		return res.status(409).json({ error: 'Hubo un error al crear el book' });
	}
};

const getAll = async (req, res) => {
	try {
		const books = await models.book.find();
		return res.json({ books });
	} catch (_) {
		return res.json({ books: [] });
	}
};

const get = async (req, res) => {
	try {
		const { id } = req.params;

		const book = await models.book.findById(id).populate('author');
		return res.json({ book });
	} catch (_) {
		return res.status(409).json({ error: 'Book no encontrado' });
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;

		await models.book.findByIdAndRemove(id); //TODO: check it.
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
		const { title, authorId } = req.body;

		console.log({ title, authorId });

		const book = await models.book.findById(id);
		book.title = title;
		book.author = authorId;

		// const author = models.author.findById(authorId)

		// await models.book.findByIdAndUpdate(id, {
		// 	$set: { title, author: authorId },
		// });

		await book.save();

		return res.json('casa');
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
