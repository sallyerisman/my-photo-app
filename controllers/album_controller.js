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

/* Add photos to a specific album */
const addPhotos = async (req, res) => {
	// Find any validation errors and wrap them in an object
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	try {
		const album = await Album.fetchById(req.params.albumId);

		const userId = req.user.data.id;
		const user_id = album.get("user_id");

		if (user_id !== userId) {
			res.status(401).send({
				status: "fail",
				data: "You are not authorized to make changes to this album.",
			});
			return;
		}

		if (validData.photos) {
			await album.photos().attach(validData.photos);

			res.status(201).send({
				status: "success",
				data: null,
			});
			return;
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			data: "Exeption thrown when trying to add photo to the album.",
		});
		throw err;
	}
}

/* Delete an album */
const destroy = async (req, res) => {
	const albumId = req.params.albumId;

	try {
		const album = await Album.fetchById(albumId, { withRelated: "photos" });
		if (!album) {
			res.status(405).send({
				status: "fail",
				data: `No album with ID ${albumId} to delete.`,
			});
			return;
		}

		const userId = req.user.data.id;
		const user_id = album.get("user_id");

		if (user_id === userId) {

			album.photos().detach();
			album.destroy();

			res.send({
				status: 'success',
				data: null,
			});
			return;
		}
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: `Sorry, database threw an error when trying to delete photo with ID ${albumId}.`,
		});
		throw error;
	}
};

module.exports = {
	index,
	show,
	createAlbum,
	addPhotos,
	destroy,
}
