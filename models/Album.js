/* ALBUM MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
	}, {
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
