/* USER VALIDATION RULES */

const { body } = require('express-validator');
const { Photo, User } = require('../../models');


const addPhotoRules = [
	body('photo_id').custom(value => {
		return Photo.fetchById(value);
	}),
];

const createAlbumRules = [
	body('title').isLength({ min: 2 }),
];

const createPhotoRules = [
	body('title').isLength({ min: 2 }),
	body('url').isLength({ min: 10 }),
	body('description').optional().isLength({ min: 3 }),
];

const registerRules = [
	body('email').isEmail().custom(async value => {
		const user = await new User({ email: value }).fetch({ require: false });
		if (user) {
			return Promise.reject('Email already exists.');
		}

		return Promise.resolve();
	}),
	body('password').isLength({ min: 3 }),
	body('first_name').optional().isLength({ min: 2 }),
	body('last_name').optional().isLength({ min: 2 }),
];

module.exports = {
	addPhotoRules,
	createAlbumRules,
	createPhotoRules,
	registerRules,
}
