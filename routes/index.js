const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: "Let's look at some photos!" });
});

router.use('/photos', require('./photos_router'));
router.use('/albums', require('./albums_router'));


module.exports = router;
