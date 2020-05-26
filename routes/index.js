/* APP ROUTES */

const express = require('express');
const router = express.Router();

const auth = require("../controllers/middlewares/auth");
const authController = require("../controllers/auth_controller");

const { registerRules } = require('../validation_rules/user');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: "Let's look at some photos!" });
});

// Add ability to log in
router.post("/login", authController.login);

// Add ability to register a new user
router.post("/register", registerRules, authController.register);

// Add ability to validate JWTs
router.use('/profile', [auth.validateJWT], require('./profile_router'));


module.exports = router;
