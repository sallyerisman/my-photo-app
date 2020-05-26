/* PHOTOS ROUTER */

const express = require('express');
const router = express.Router();

const { index, show } = require("../controllers/photo_controller");

// GET /
router.get('/', index);

// GET /:photoId
router.get('/:photoId', show);


module.exports = router;
