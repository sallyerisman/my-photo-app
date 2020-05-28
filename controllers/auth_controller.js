/*  AUTHORIZATION CONTROLLER */

const bcrypt = require("bcryptjs");
const { matchedData, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


/* Issue (JWT) access and refresh tokens */
const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);
	if (!user) {
		res.status(401).send({
			status: "fail",
			data: "Authentication required.",
		});
		return;
	}

	// Construct JWT payload
	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email'),
		}
	};

	// Sign payload and get access token
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1h" });

	// Sign payload and get refresh token
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d" });

	res.send({
		status: "success",
		data: {
			accessToken,
			refreshToken,
		},
	});
}

/* Issue new access token */
const refresh = (req, res) => {
	const token = getTokenfromHeaders(req);
	if (!token) {
		res.status(401).send({
			status: "fail",
			data: "No token found in request headers.",
		});
		return;
	}

	try {
		// Verify token using the refresh token secret
		const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		// Construct new payload
		const payload = {
			data,
		}

		// Issue a new token using the access token secret
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1h"});

		res.send({
			status: "success",
			data: {
				access_token,
			},
		});

	} catch {
		res.status(403).send({
			status: "fail",
			data: "Invalid token.",
		});
		return;
	}
}

/* Register new user */
const register = async (req, res) => {
	// Find any validation errors and wrap them in an object
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// Generate hash of validData.password
	try {
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds);

	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown when hashing the password.",
		});
		throw error;
	}

	try {
		await new User(validData).save();

		res.status(201).send({
			status: "success",
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when trying to create a new user.",
		});
		throw error;
	}
}


/* Get token from HTTP headers */
const getHeadersToken = (req) => {
	// Check if authorization header exists
	if (!req.headers.authorization) {
		return false;
	}

	// Split authorization header into its components
	const [authType, token] = req.headers.authorization.split(' ');

	// Check that the authType is Bearer
	if (authType.toLowerCase() !== "bearer") {
		return false;
	}

	return token;
}

module.exports = {
	login,
	refresh,
	register,
	getHeadersToken,
}

