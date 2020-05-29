/* ALBUMS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createAlbum, show, addPhotos, updateAlbumTitle, removePhoto, destroy } = require("../controllers/album_controller");
const { addPhotosRules, createAlbumRules, updateAlbumRules } = require('../controllers/middlewares/validation_rules');

// GET /albums
router.get('/', index);

// POST /albums
router.post('/', [ createAlbumRules ], createAlbum);

// GET /albums/:albumId
router.get('/:albumId', show);

// POST /albums/:albumId
router.post('/:albumId/photos', [ addPhotosRules ], addPhotos);

// PUT /albums/:albumId
router.put('/:albumId', [ updateAlbumRules ], updateAlbumTitle);

// DELETE /albums/:albumId
router.delete('/:albumId', destroy);

// DELETE /albums/:albumId/photos/:photoId
router.delete('/:albumId/photos/:photoId', removePhoto);


module.exports = router;
