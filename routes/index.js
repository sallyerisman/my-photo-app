/* APP ROUTES */

const express = require('express');
const router = express.Router();

const auth = require("../controllers/middlewares/auth");
const authController = require("../controllers/auth_controller");

const { registerRules } = require('../controllers/middlewares/validation_rules');

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: "Let's look at some photos!" });
});

router.use('/albums', [auth.validateJWT], require('./albums_router'));
router.use('/photos', [auth.validateJWT], require('./photos_router'));

// Add ability to log in
router.post("/login", authController.login);

// Add ability to register a new user
router.post("/register", registerRules, authController.register);


module.exports = router;
