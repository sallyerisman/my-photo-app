/* ALBUMS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createAlbum, show, addPhotos, destroy } = require("../controllers/album_controller");
const { addPhotosRules, createAlbumRules } = require('../controllers/middlewares/validation_rules');

// GET /albums
router.get('/', index);

// POST /albums
router.post('/', [ createAlbumRules ], createAlbum);

// GET /albums/:albumId
router.get('/:albumId', show);

// POST /albums/:albumId
router.post('/:albumId', [ addPhotosRules ], addPhotos);

// DELETE /albums/:albumId
router.delete('/:albumId', destroy);


module.exports = router;
