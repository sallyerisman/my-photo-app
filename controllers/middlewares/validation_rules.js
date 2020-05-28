/* VALIDATION RULES */

const { body } = require('express-validator');
const { Photo, User } = require('../../models');


const id_validator = async values => {
	// check that every element in array is a number
	if (!values.every(Number.isInteger)) {
		return Promise.reject("Invalid value in array");
	}

	// check for match in database
	for (let i = 0; i < values.length; i++) {
		const result = await Photo.fetchById(values[i]);

		if (!result) {
			return Promise.reject(`Photo ${values[i]} does not exist.`)
		}
	}
 };

const addPhotosRules = [
	body('photos').isArray().custom(id_validator),
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
	addPhotosRules,
	createAlbumRules,
	createPhotoRules,
	registerRules,
}
