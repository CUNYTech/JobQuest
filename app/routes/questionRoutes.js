'use strict';
module.exports = function(app) {
	var controller = require('../controllers/questionController'); // create controller

	// GET REQUESTS 
	app.route('/interviewQuestions')
		.get(controller.show_all_questions); 
	app.route('/interviewQuestions/:QuestionId/show')
		.get(controller.show_a_question);
	//app.route('/interview')
		//.get(controller.show_all_posts);

	// POST REQUESTS 
	app.route('/interviewQuestions/create')
		.post(controller.create_a_question);
	app.route('/interviewQuestions/:QuestionId/edit')
		.post(controller.edit_a_question);

	// DELETE REQUESTS 
	app.route('/interviewQuestions/:QuestionId/remove')
		.delete(controller.remove_a_question);
};