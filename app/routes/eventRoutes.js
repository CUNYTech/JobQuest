'use strict';
module.export = function(app){
	var controller = require('../controllers/eventController');

	// GET REQUESTS
	app.route('/events')
		.get(controller.show_all_events);
	app.route('/events/:EventId/show')
		.get(controller.show_an_event);


	// POST REQUESTS
	app.route('/events/create')
		.post(controller.create_an_events);
	app.route('/events/:EventId/edit')
		.post(controller.edit_an_events);

	// DELETE REQUESTS
	app.route('/events/:EventId/remove')
		.delete(controller.remove_an_events);	

};