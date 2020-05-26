/* PHOTOS ROUTER */

const express = require('express');
const router = express.Router();

const { index, createPhoto, show } = require("../controllers/photo_controller");
const { createRules } = require('../controllers/middlewares/validation_rules');

// GET /
router.get('/', index);

// POST /photos
router.post('/photos', [ createRules ], createPhoto);

// GET /:photoId
router.get('/:photoId', show);


module.exports = router;
