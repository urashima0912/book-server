const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
})

module.exports = model('Admin', adminSchema)