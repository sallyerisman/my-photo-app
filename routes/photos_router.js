/* PHOTOS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createPhoto, show, updatePhotoComment, destroy } = require("../controllers/photo_controller");
const { createPhotoRules, updateCommentRules } = require('../controllers/middlewares/validation_rules');

// GET /photos
router.get('/', index);

// POST /photos
router.post('/', [ createPhotoRules ], createPhoto);

// GET /photos/:photoId
router.get('/:photoId', show);

// PUT /photos/:photoId
router.put('/:photoId', updateCommentRules, updatePhotoComment);

// DELETE /photos/:photoId
router.delete('/:photoId', destroy);


module.exports = router;
