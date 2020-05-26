/*  PHOTO CONTROLLER */

const { User, Photo } = require('../models');

// Get all of the user's photos
const index = async (req, res) => {

	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: "photos" });

		// Get this user's photos
		const photos = user.related("photos");

		res.send({
			status: "success",
			data: {
				photos,
			}
		});

	} catch {
		res.status(404).send({
			status: "fail",
			data: "Photos not found.",
		});
	}
};

// Get a specific photo
const show = async (req, res) => {
	try {
		const photo = await Photo.fetchById(req.params.photoId, { withRelated: "user" });

		const userId = req.user.data.id;

		// Get the user who owns the photo
		const [ user ] = photo.related("user");

		if (user.id === userId) {
			res.send({
				status: "success",
				data: {
					photo,
				}
			});
			return;
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
