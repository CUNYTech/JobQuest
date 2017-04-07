'use strict';

//Requires mongoose and our schemas
var mongoose = require('mongoose'); 
var Question = mongoose.model('InterviewQuestions'); 
var Answer = mongoose.model('Answers');

//Adds an optinal answer to a question. Takes the id of the question and the answer text. Returns the modified question.
exports.add_an_answer = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var questionid = req.params.QuestionId;
	var answer = req.body.answerText; // possible change
	var errors = {};

	//Error checking on all required parameters
	if(!questionid)
		errors.questionid = 'No question ID parameter provided (check URL)';
	if(!answer)
		errors.answerText = 'No answerText parameter provided (check body)';

	//Returns all errors
	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	Question.findOne({_id:questionid}, function(err, question) {
		if(err)
			return res.status(500).send(err);
		if(question == null){
			errors.questionid = 'Question id:'+questionid+' not found';
			return res.status(404).json(errors);
		}

		question.otherAnswers.push(new Answer({answerText:answer, author:req.user.name, authorID:req.user._id})); 

		question.save(function(err, question) {
			if(err)
				return res.status(500).send(err);
			console.log('Answer successfully inserted to question id:'+questionid);
			return res.json(question);
		});
	});
};

//Edits an answer. Takes a questionid and answerid as well as the answerText.
exports.edit_an_answer = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var questionid = req.params.QuestionId;
	var answerid = req.params.AnswerId;
	var answer = req.body.answerText;
	var errors = {};

	if(!answer)
		errors.answer = 'No answer parameter provided (check body)';
	if(!answerid)
		errors.answertid = 'No answer ID parameter provided (check URL)';
	if(!questionid)
		errors.questionid = 'No question ID parameter provided (check URL)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	Question.findOne({_id: questionid}, function(err, question) {
		if(err)
			return res.status(500).send(err);
		if(question == null){
			errors.questionid = 'Question id:'+questionid+' not found';
			return res.status(404).json(errors);
		}

		var foundAnswer = false;
		for(var i = 0; i < question.otherAnswers.length; i++) {
			if(answerid == question.otherAnswers[i]._id){
				foundAnswer = true;
				//If the user requests an answer which he/she did not create
				if(req.user._id != question.otherAnswers[i].authorID){
					errors.userid = 'User does not have permission to modify answer with id:'+answerid;
					return res.status(401).json(errors);
				}
				question.otherAnswers[i].answerText = answer; 
				break;
			}
		}
		if(!foundAnswer){
			errors.answerid = 'Answer id:'+answerid+' not found';
			return res.status(404).json(errors);
		}

		question.save(function(err, question) {
			if(err)
				return res.status(500).send(err);
			console.log('Answer successfully updated');
			return res.json(question);
		});
	});
};

//Removes a comment. Takes the questionid and answerid.
exports.remove_an_answer = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var questionid = req.params.QuestionId;
	var answerid = req.params.AnswerId;
	var errors = {};

	if(!questionid)
		errors.questionid = 'No question ID parameter provided (check URL)';
	if(!answerid)
		errors.answerid = 'No answer ID parameter provided (check URL)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	Question.findOne({_id: questionid}, function(err, question) {
		if(err)
			return res.status(500).send(err);
		if(question == null){
			errors.questionid = 'Question id:'+questionid+' not found';
			return res.status(404).json(errors);
		}

		var foundAnswer = false;
		for(var i = 0; i < question.otherAnswers.length; i++) {
			if(answerid == question.otherAnswers[i]._id){
				foundAnswer = true;
				//If the user requests an answer which he/she did not create
				if(req.user._id != question.otherAnswers[i].authorID){
					errors.userid = 'User does not have permission to modify answer with id:'+answerid;
					return res.status(401).json(errors);
				}
				//Removes 1 element from array with index at i, returns modified array
				question.otherAnswers.splice(i, 1);
				break;
			}
		}
		if(!foundAnswer){
			errors.answerid = 'Answer id:'+answerid+' not found';
			return res.status(404).json(errors);
		}

		question.save(function(err, question) {
			if(err)
				return res.status(500).send(err);
			console.log('Answer successfully updated'); 
			return res.json(question);
		});
	});
};




