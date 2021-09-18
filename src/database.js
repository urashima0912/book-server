const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.database.url)
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log(err)
  })
