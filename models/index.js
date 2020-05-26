
// Setting up database connection

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'photo_app',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photo_app',
	}
});

const bookshelf = require('bookshelf')(knex);

const Photo = require('./Photo')(bookshelf);


module.exports = {
	bookshelf,
	Photo,
};

