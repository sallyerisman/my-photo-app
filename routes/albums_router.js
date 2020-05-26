/* ALBUMS ROUTER */

const express = require('express');
const router = express.Router();

const { index, show } = require("../controllers/album_controller");

// GET /
router.get('/', index);

// GET /:albumId
router.get('/:albumId', show);


module.exports = router;
