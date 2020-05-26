/* ALBUM MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.hasMany('Photo');
		},
		user() {
			return this.belongsTo('User');
		}
	}, {
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
