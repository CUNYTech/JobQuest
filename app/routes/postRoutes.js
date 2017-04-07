'use strict';
module.exports = function(app) {
	var controller = require('../controllers/postController');

	// GET REQUESTS
	app.route('/posts')
		.get(controller.show_all_posts);
	app.route('/posts/:PostId/show')
		.get(controller.show_a_post);
	//app.route('/interview')
		//.get(controller.show_all_posts);

	// POST REQUESTS
	app.route('/posts/create')
		.post(controller.create_a_post);
	app.route('/posts/:PostId/edit')
		.post(controller.edit_a_post);
	app.route('/vote/:typeId/:PostId')
		.post(controller.vote_on_post);

	// DELETE REQUESTS
	app.route('/posts/:PostId/remove')
		.delete(controller.remove_a_post);
};