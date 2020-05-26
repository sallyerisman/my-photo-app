/* AUTHENTICATION MIDDLEWARE */

const jwt = require("jsonwebtoken");
const { getHeadersToken } = require("../auth_controller")


/* Validate (JWT) access token */
const validateJWT = (req, res, next) => {

	const token = getHeadersToken(req);
	if (!token) {
		res.status(401).send({
			status: "fail",
			data: "No token found in request headers.",
		});
		return;
	}

	// Validate token and extract payload
	let payload = null;

	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (err) {
		res.status(403).send({
			status: "fail",
			data: "Authentication failed.",
		});
		throw err;
	}

	// Attach payload to req.user
	req.user = payload;

	next();
}

module.exports = {
	validateJWT,
}

