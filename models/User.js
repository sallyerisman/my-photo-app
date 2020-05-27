/* USER MODEL */

const bcrypt = require("bcryptjs");

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.hasMany('Photo');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, {
		hashSaltRounds: 10,

		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},

		login: async function(email, password) {
			try {
			// Check if user exists
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			// Get hashed password from db
			const hash = user.get('password');

			// Generate hash of cleartext password
			// Compare new hash with hash from db
			const result = await bcrypt.compare(password, hash);

			// If hashes match, return user, otherwise false
			return (result)
				? user
				: false;

		} catch (err) {
			console.log("There was an error: ", err)
		}
		}
	});
};


