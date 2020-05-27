/*  ALBUM CONTROLLER */

const { matchedData, validationResult } = require("express-validator");
const { Album, Photo } = require('../models');

/* Get all of the user's albums */
const index = async (req, res) => {
	try {
		const userId = req.user.data.id;
		const albums = await Album.where("user_id", userId).fetchAll();

		res.send({
			status: "success",
			data: {
				albums,
			}
		});
	} catch {
		res.status(404).send({
			status: "fail",
			data: "Albums not found.",
		});
	}
};

/* Get a specific album */
const show = async (req, res) => {
	try {
		const album = await Album.fetchById(req.params.albumId, { withRelated: "photos" });

		const userId = req.user.data.id;
		const user_id = album.get("user_id");
		const photos = album.related("photos");

		if (user_id === userId) {
			res.send({
				status: "success",
				data: {
					album: {
						id: album.get('id'),
						title: album.get('title'),
						photos,
					},
				}
			});
			return;
		}

	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to find this particular album.",
		})
	}
};

/* Create new album */
const createAlbum = async (req, res) => {
	// Find any validation errors and wrap them in an object
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: "fail",
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	const album = {
		title: validData.title,
		user_id: req.user.data.id
	}

	try {
		await new Album(album).save();

		res.status(201).send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
}

/* Add photo to a specific album */
const addPhoto = async (req, res) => {
	// Find any validation errors and wrap them in an object
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		const photo = await Photo.fetchById(req.body.photo_id);
		const album = await Album.fetchById(req.params.albumId);

		const userId = req.user.data.id;
		const user_id = album.get("user_id");

		let result = null;
		if (user_id === userId) {
			result = await album.photos().attach(photo);
		}

		res.status(201).send({
			status: "success",
			data: result,
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			data: "Exeption thrown when trying to add photo to the album profile.",
		});
		throw err;
	}
}

module.exports = {
	index,
	show,
	createAlbum,
	addPhoto,
}
