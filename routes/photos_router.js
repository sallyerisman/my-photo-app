/* PHOTOS ROUTER */

const express = require('express');
const router = express.Router();

const { index, store, show, update, destroy } = require("../controllers/photo_controller");
const { createPhotoRules, updatePhotoRules } = require('../controllers/middlewares/validation_rules');

// GET /photos
router.get('/', index);

// POST /photos
router.post('/', [ createPhotoRules ], store);

// GET /photos/:photoId
router.get('/:photoId', show);

// PUT /photos/:photoId
router.put('/:photoId', updatePhotoRules, update);

// DELETE /photos/:photoId
router.delete('/:photoId', destroy);


module.exports = router;
