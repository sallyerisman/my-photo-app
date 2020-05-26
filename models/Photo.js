/* PHOTO MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.hasMany('Album');
		},
		user() {
			return this.belongsToMany('User');
		}
	}, {
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
