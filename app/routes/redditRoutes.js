'use strict';
module.exports = function(app) {
	var controller = require('../controllers/redditController');

	// GET REQUESTS
	app.route('/reddit/:Subreddit/:Sort/')
		.get(controller.show_subreddit);

	// POST REQUESTS
	app.route('/reddit/:Subreddit/search')
		.post(controller.search_subreddit);

	// DELETE REQUESTS
};