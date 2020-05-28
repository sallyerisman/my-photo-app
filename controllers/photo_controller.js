/*  PHOTO CONTROLLER */

const { matchedData, validationResult } = require("express-validator");
const { User, Photo } = require('../models');

/* Get all of the user's photos */
const index = async (req, res) => {
	try {
		const userId = req.user.data.id;
		const photos = await Photo.where("user_id", userId).fetchAll();

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

/* Get a specific photo */
const show = async (req, res) => {
	try {
		const photo = await Photo.fetchById(req.params.photoId, {withRelated: "albums" });
		const userId = req.user.data.id;
		const user_id = photo.get("user_id");

		const albums = photo.related("albums");

		if (user_id === userId) {
			res.send({
				status: "success",
				data: {
					photo: {
						id: photo.get('id'),
						title: photo.get('title'),
						url: photo.get('url'),
						description: photo.get('description'),
						albums,
					},
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

/* Create new photo */
const createPhoto = async (req, res) => {
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

	const photo = {
		title: validData.title,
		url: validData.url,
		description: validData.description,
		user_id: req.user.data.id
	}

	try {
		await new Photo(photo).save();

		res.status(201).send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new photo.',
		});
		throw error;
	}
};

/* Update photo description */
const updatePhotoDescription = async (req, res) => {
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

	let photo = null;
	try {
		photo = await Photo.fetchById(req.params.photoId);
		const userId = req.user.data.id;
		const user_id = photo.get("user_id");

		if (user_id !== userId) {
			res.status(401).send({
				status: "fail",
				data: "You are not authorized to make changes to this photo.",
			});
			return;
		}
	} catch {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to find this particular photo.",
		})
	}

	try {
		await photo.save(validData);
		res.status(204).send({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Error thrown in database when trying to update the photo description.",
		});
		throw error;
	}
};


/* Delete a specific photo */
const destroy = async (req, res) => {
	const photoId = req.params.photoId;

	try {
		const photo = await Photo.fetchById(photoId, { withRelated: "albums" });
		if (!photo) {
			res.status(405).send({
				status: "fail",
				data: `No photo with ID ${photoId} to delete.`,
			});
			return;
		}

		const userId = req.user.data.id;
		const user_id = photo.get("user_id");

		if (user_id === userId) {

			photo.albums().detach();
			photo.destroy();

			res.send({
				status: 'success',
				data: null,
			});
			return;
		}
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: `Sorry, database threw an error when trying to delete photo with ID ${photoId}.`,
		});
		throw error;
	}
};


module.exports = {
	index,
	show,
	createPhoto,
	updatePhotoDescription,
	destroy,
}
