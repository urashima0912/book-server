const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
	isbn: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'Author',
		required: true,
	},
});

module.exports = model('Book', bookSchema);
