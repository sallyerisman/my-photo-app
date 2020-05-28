/* APP ROUTES */

const express = require('express');
const router = express.Router();
const auth = require("../controllers/middlewares/auth");
const { login, refresh, register } = require("../controllers/auth_controller");
const { registerRules } = require('../controllers/middlewares/validation_rules');

router.get('/', (req, res) => {
	res.send({ status: "Let's look at some photos!" });
});

router.use('/albums', [auth.validateJWT], require('./albums_router'));
router.use('/photos', [auth.validateJWT], require('./photos_router'));

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/register", registerRules, register);


module.exports = router;
