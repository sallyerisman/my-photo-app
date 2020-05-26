/* USER VALIDATION RULES */

const { body } = require('express-validator');
const { User } = require('../../models');

const createRules = [
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
	createRules,
	registerRules,
}
