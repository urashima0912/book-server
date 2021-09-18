const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const fileUpload = require('express-fileupload');
const path = require('path');

const server = express();

// Settings.
server.set('PORT', 4500);

// Middlewares.
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(fileUpload());

// Routes.
server.use('/api/admin', routes.admin);
server.use('/api/author', routes.author);
server.use('/api/book', routes.book);

// Public folder.
server.use(express.static(path.join(__dirname, 'static')));
module.exports = server;
