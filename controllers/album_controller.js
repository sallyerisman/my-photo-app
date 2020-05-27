/*  ALBUM CONTROLLER */

const { matchedData, validationResult } = require("express-validator");
const { User, Album } = require('../models');

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
		const album = await Album.fetchById(req.params.albumId);

		console.log("ALBUM: ", album)
		const userId = req.user.data.id;
		const user_id = album.get("user_id");

		if (user_id === userId) {
			res.send({
				status: "success",
				data: {
					album: {
						id: album.get('id'),
						title: album.get('title'),
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
	console.log("Valid data: ", validData);

	try {
		await new Album(validData).save();

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

module.exports = {
	index,
	show,
	createAlbum,
}
