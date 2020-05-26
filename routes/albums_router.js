/* ALBUMS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createAlbum, show } = require("../controllers/album_controller");
const { createAlbumRules } = require('../controllers/middlewares/validation_rules');

// GET /albums
router.get('/', index);

// POST /albums
router.post('/', [ createAlbumRules ], createAlbum);

// GET albums/:albumId
router.get('/:albumId', show);


module.exports = router;
