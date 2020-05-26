/* USER VALIDATION RULES */

const { body } = require('express-validator');
const { User } = require('../models');

const registerRules = [
	body('email').isLength({ min: 3 }).custom(async value => {
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
	registerRules,
}
