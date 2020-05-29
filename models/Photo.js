/* PHOTO MODEL */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album');
		},
	},{
		fetchById(id, options) {
			return new this({ id }).fetch(options)
		},
	});
}
