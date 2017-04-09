'use strict';

//Requires mongoose and our schemas
var mongoose = require('mongoose');
var Post = mongoose.model('Posts');
var Comment = mongoose.model('Comments');
var User = mongoose.model('User');

//Shows all posts. Returns every post in the collection.
exports.show_all_posts = function(req, res) {
	Post.find({}, function(err, posts) {
		if (err)
			return res.status(500).send(err);
		console.log("All posts shown");
		return res.json(posts);
	});
};

//Creates a post given a title, thread, and author. Returns the new post.
exports.create_a_post = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var postTitle = req.body.title;
	var postThread = req.body.thread;
	var errors = {};

	if(!postTitle)
		errors.title = 'No title parameter provided (check body)';
	if(!postThread)
		errors.thread = 'No thread parameter provided (check body)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	//Create a new post schema instance with a title, thread, and author.
	//Only the title and thread is required; author defaults to "Anonymous" if none is provided.
	var new_post = new Post({
		title:postTitle,
		thread:postThread,
		author:req.user.name,
		authorID:req.user._id,
		comments:[],
		votedOn:[]
	});

	//Saves the new post into the Post collection
	new_post.save(function(err, post) {
		if (err)
			return res.status(500).send(err);
		console.log('Post successfully created with id:'+post._id);
		return res.json(post);
	});
};

//Displays a post given an ID.
exports.show_a_post = function(req, res) {

	var id = req.params.PostId;
	var errors = {};

	if(!id){
		errors.postid = 'No post ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}

	Post.findById(id, function(err, post) {
		if (err)
			return res.status(500).send(err);
		if(post == null){

			return res.status(404).send('Post id:'+id+' not found');
		}

		console.log('Displaying post with id:'+id)
		return res.json(post);	
	});
};

//Edits either a post's title, thread, or both. Returns the modified post.
exports.edit_a_post = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var id = req.params.PostId;
	var errors = {};

	if(!id){
		errors.postid = 'No post ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}
	
	Post.findById(id, function(err, post) {
		if (err)
			return res.status(500).send(err);
		if(post == null) {
			return res.status(404).json({error:'Post id:'+id+' not found'});
		}
		if(post.authorID == req.user._id || req.user.isAdmin){
			//Sets a new value to the title/thread ONLY if a new title/thread value is provided.
			//Otherwise, it will retain its old value
			post.title = req.body.title || post.title;
			post.thread = req.body.thread || post.thread;

			post.save(function(err, post) {
				if(err)
					return res.status(500).send(err);
				console.log('Post id:'+id+' successfully updated');
				return res.json(post);
			});
		}
		else {
			console.log('User requested to modify post made by '+post.authorID+' but has id '+req.user._id);
			return res.status(401).json({error:'User does not have permission to modify this post'});
		}
	});
};

//Removes a post. Returns a success message.
exports.remove_a_post = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var id = req.params.PostId;
	var errors = {};

	if(!id){
		errors.postid = 'No post ID parameter provided (check URL)';
		return res.status(400).json(errors);
	}

	Post.findById(id, function(err, post) {
		if (err)
			return res.status(500).send(err);
		if(post == null) {
			return res.status(404).json({error:'Post id:'+id+' not found'});
		}
		if(post.authorID == req.user._id || req.user.isAdmin){
			//Removes the post
			post.remove();
			console.log('Post id:'+id+' successfully removed');
			return res.json({result:'Post removed'});
		}
		else {
			console.log('User requested to modify post made by '+post.authorID+' but has id '+req.user._id);
			return res.status(401).json({error:'User does not have permission to modify this post'});
		}
	});
};

//Votes a post up/down depending on the :type query parameter. Returns the modified post.
exports.vote_on_post = function(req, res) {

	if(!req.isValidUser){
		console.log('Request not completed due to lack of authentication');
		return res.status(401).json({error:'User must be logged in to access this function'});
	}

	var id = req.params.PostId;
	var type = req.params.typeId;
	var errors = {};

	if(!id)
		errors.postid = 'No post ID parameter provided (check URL)';
	if(!type)
		errors.type = 'No type parameter provided (check URL)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	Post.findById(id, function(err, post) {

		// post is an array of objects
		var post = post[0];
		if(err)
			return res.status(500).send(err);
		if(post == null) {
			errors.postid = 'Post id:'+id+' not found';
			return res.status(404).json(errors);
		}

		console.log('post is, ', post);
		console.log('post is, ', post.votedOn);

		var foundUser = false;
		for(var i = 0; i < post.votedOn.length; i++) {
			if(req.user._id == post.votedOn[i].userID){
				foundUser = true;
				console.log('User voted on post '+id+' before, taking previous post value');
				break;
			}
		}
		if(!foundUser){	//Could not find user in votedOn array, make a new entry
			console.log('User did not vote on post '+id+' yet, adding to votedOn array');
			var length = post.votedOn.length;
			post.votedOn.push({userID:req.user._id, value:0});
			if(length != 0){	//Only increment index if array was previously non-empty, otherwise we would have an index of 1 in an array of size 1.
				i++;
			}
		}

		if(type == "up"){	//Increment votes
			switch(post.votedOn[i].value){
				case -1: 	//Downvote -> Upvote = Upvote (Increment by 2)
					post.votes = post.votes + 2;
					post.votedOn[i].value = 1;
					break;
				case 0: 	//Neutral -> Upvote = Upvote (Increment by 1)
					post.votes++;
					post.votedOn[i].value++;
					break;
				case 1: 	//Upvote -> Upvote = Neutral (Toggle upvote)
					post.votes--;
					post.votedOn[i].value--;
					break;
				default:
					break;
			}
		}
		else if(type == "down"){	//Decrement votes
			switch(post.votedOn[i].value){
				case -1: 	//Downvote -> Downvote = Neutral (Toggle downvote)
					post.votes++;
					post.votedOn[i].value++;
					break;
				case 0: 	//Neutral -> Downvote = Downvote (Decrement by 1)
					post.votes--;
					post.votedOn[i].value--;
					break;
				case 1: 	//Upvote -> Downvote = Downvote (Decrement by 2)
					post.votes = post.votes - 2;
					post.votedOn[i].value = -1;
					break;
				default:
					break;
			}
		}
		else{
			errors.type = 'Type '+type+' is not a valid type';
			return res.status(400).json(errors);
		}

		post.save(function(err, post) {
			if(err)
				return res.status(500).send(err);
			console.log('Voted '+type+' on post id:'+id);
			return res.json(post)
		});
	});
};