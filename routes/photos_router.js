/* PHOTOS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createPhoto, show, updatePhotoDescription, destroy } = require("../controllers/photo_controller");
const { createPhotoRules, updateDescriptionRules } = require('../controllers/middlewares/validation_rules');

// GET /photos
router.get('/', index);

// POST /photos
router.post('/', [ createPhotoRules ], createPhoto);

// GET /photos/:photoId
router.get('/:photoId', show);

// PUT /photos/:photoId
router.put('/:photoId', updateDescriptionRules, updatePhotoDescription);

// DELETE /photos/:photoId
router.delete('/:photoId', destroy);


module.exports = router;
