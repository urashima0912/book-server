const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})

module.exports = model('Author', authorSchema)