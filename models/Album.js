/* ALBUM MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.belongsToMany('Photo');
		},
	}, {
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
