/*  PHOTO CONTROLLER */

const models = require('../models');

// Get all of the user's photos
const index = async (req, res) => {
	try {
		const all_photos = await models.Photo.fetchAll();

		res.send({
			status: "success",
			data: {
				photos: all_photos
			}
		});
	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to get all photos.",
		})
	}

};

// Get a specific photo
const show = async (req, res) => {
	try {
		const photo = await models.Photo.fetchById(req.params.photoId, { withRelated: "albums" });

		if (photo) {
			res.send({
				status: "success",
				data: {
					photo,
				}
			});
		} else {
			res.status(404).send({
				status: "fail",
				message: `Sorry, database threw an error when trying to find photo with id ${req.params.photoId}.`,
			})
		}
	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to find this particular photo.",
		})
	}
};

module.exports = {
	index,
	show,
}
