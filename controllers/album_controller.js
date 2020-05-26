/*  ALBUM CONTROLLER */

const { matchedData, validationResult } = require("express-validator");
const { User, Album } = require('../models');

/* Get all of the user's albums */
const index = async (req, res) => {

	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: "albums" });

		// Get this user's albums
		const albums = user.related("albums");

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

		const [ photos ] = album.related("photos");
		console.log("PHOTOS: ", photos)

		if (album) {
			res.send({
				status: "success",
				data: {
					album,
				}
			});
			return;
		}

		// // Get the user who owns the photo
		// const [ user ] = album.related("user");

		// if (user.id === userId) {
		// 	res.send({
		// 		status: "success",
		// 		data: {
		// 			album,
		// 		}
		// 	});
		// 	return;
		// }
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
