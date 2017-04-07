'use strict';

//Requires mongoose and our schemas
var mongoose = require('mongoose');
var Question = mongoose.model('InterviewQuestions');
var Answer = mongoose.model('Answers');
var User = mongoose.model('User');

//Shows all questions and user-rovided answer. Returns every question/answer.
exports.show_all_questions = function(req, res) {
	Question.find({}, function(err, newQuestion) {
		if (err)
			return res.status(500).send(err);
		console.log("All questions shown");
		return res.json(newQuestion);
	});
};

//Creates a question given QuestionTopic, QuestionTitle and Question
exports.create_a_question = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var questionTopic = req.body.topic;
	var questionTitle = req.body.title; 
	var question = req.body.question;
	var answer = req.body.originalAnswer;
	var errors = {};

	if(!questionTopic)
		errors.topic = 'No topic parameter provided (check body)';
	if(!questionTitle)
		errors.title = 'No title parameter provided (check body)';
	if(!question)
		errors.question = 'No question parameter provided (check body)';
	if(!answer)
		errors.originalAnswer = 'No answer parameter provided (check body)';

	if(Object.keys(errors).length > 0) //??
		return res.status(400).json(errors);

	//Create a new question schema instance with a topic, title, question and author.
	//Only the topic, title and actual question are required; author defaults to "Anonymous" if none is provided.
	var new_question = new Question({
		topic:questionTopic,
		title:questionTitle,
		question:question,
		originalAnswer:answer,
		author:req.user.name,
		authorID:req.user._id,
		answers:[]
	});

	//Saves the new question into the Question collection
	new_question.save(function(err, newQuestion) {
		if (err)
			return res.status(500).send(err);
		console.log('Question successfully created with id:'+newQuestion._id);
		return res.json(newQuestion);
	});
};

//Displays a question given an ID.
exports.show_a_question = function(req, res) {

	var id = req.params.QuestionId;
	var errors = {};

	if(!id){
		errors.questionid = 'No question ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}

	Post.findById(id, function(err, newQuestion) {
		if (err)
			return res.status(500).send(err);
		if(newQuestion == null){

			return res.status(404).send('newQuestion id:'+id+' not found');
		}

		console.log('Displaying newQuestion with id:'+id)
		return res.json(newQuestion);	
	});
};

//Edits question's topic, title, actual question or one of the above. Returns the modified question.
exports.edit_a_question = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var id = req.params.QuestionId;
	var errors = {};

	if(!id){
		errors.questionid = 'No question ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}
	
	Question.findOne({_id:id, authorID:req.user._id}, function(err, newQuestion) {
		if (err)
			return res.status(500).send(err);
		if(newQuestion == null) {
			
			//No matching question was found, so perform one more query to check if question exists
			//This determines what error message is sent back to the client
			Question.count({_id:id}, function(err, count) { 
				if(count > 0) {	//Question exists, so issue must be due to lack of permissions
					return res.status(401).send('User does not have permission to modify this question');
				}
				else {	//Question does not exist, so that is the issue
					return res.status(404).send('Question id:'+id+' not found');
				}
			});
		}
		else {
			//Sets a new value to the topic/title/thread ONLY if a new topic/title/thread value is provided.
			//Otherwise, it will retain its old value
			newQuestion.topic = req.body.topic || newQuestion.topic;
			newQuestion.title = req.body.title || newQuestion.title;
			newQuestion.question = req.body.question || newQuestion.question;
			newQuestion.originalAnswer = req.body.originalAnswer || newQuestion.originalAnswer;

			newQuestion.save(function(err, newQuestion) {
				if(err)
					return res.status(500).send(err);
				console.log('Question id:'+id+' successfully updated');
				return res.json(newQuestion);
			});
		}
	});
};

//Removes a question. Returns a success message.
exports.remove_a_question = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var id = req.params.QuestionId;
	var errors = {};

	if(!id){
		errors.questionid = 'No question ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}

	Question.findOne({_id:id, authorID:req.user._id}, function(err, newQuestion) {
		if (err)
			return res.status(500).send(err);
		if(newQuestion == null) {
			Question.count({_id:id}, function(err, count) { 
				if(count > 0) {
					errors.userid = 'User does not have permission to modify this question';
					return res.status(401).json(errors);
				}
				else {
					errors.postid = 'Question id:'+id+' not found';
					return res.status(404).json(errors);
				}
			});
		}
		else {
			//Removes the question
			newQuestion.remove();
			console.log('question id:'+id+' successfully removed');
			return res.json({result:'Question removed'});
		}
	});
};
