const express = require('express');
const router = express.Router();

const album_controller = require("../controllers/album_controller");
const photo_controller = require("../controllers/photo_controller");

// GET /photo
router.get('/photos', photo_controller.index);

// GET photo/:photoId
router.get('/photos/:photoId', photo_controller.show);

// GET /album
router.get('/albums', album_controller.index);

// GET album/:albumId
router.get('/albums/:albumId', album_controller.show);


module.exports = router;
