/*  ALBUM CONTROLLER */

const models = require('../models');

// Get all of the user's albums
const index = async (req, res) => {
	try {
		const all_albums = await models.Album.fetchAll();

		res.send({
			status: "success",
			data: {
				albums: all_albums
			}
		});
	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to get all albums.",
		})
	}

};

// Get a specific album
const show = async (req, res) => {
	try {
		const album = await models.Album.fetchById(req.params.albumId, { withRelated: ["photos"] });

		if (album) {
			res.send({
				status: "success",
				data: {
					album,
				}
			});
		} else {
			res.status(404).send({
				status: "fail",
				message: `Sorry, database threw an error when trying to find album with id ${req.params.albumId}.`,
			})
		}
	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to find this particular album.",
		})
	}
};

module.exports = {
	index,
	show,
}
