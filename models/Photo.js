/* PHOTOS MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
	}, {
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
