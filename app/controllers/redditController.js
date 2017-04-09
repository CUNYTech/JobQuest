'use strict';

//Requires mongoose and reddit API wrapper
var mongoose = require('mongoose');
var r = require('nraw');
var Reddit = new r("Redditbot v0.0.1");

function parseData(raw_data) {

	var all_raw_posts;
	if(raw_data.data){
		all_raw_posts = raw_data.data.children;
	}
	else{
		return {'error':'raw_data.data is undefined'};
	}
	var cleaned_posts = [];

	for(var i = 0; i < all_raw_posts.length; i++){
		if(!all_raw_posts[i].data.stickied){	//Filters out any stickied posts, which are usually subreddit meta/automoderator posts.
			cleaned_posts.push({'subreddit':all_raw_posts[i].data.subreddit,
								'title':all_raw_posts[i].data.title,
								'created_at':new Date(all_raw_posts[i].data.created_utc * 1000),
								'author':all_raw_posts[i].data.author,
								'votes':all_raw_posts[i].data.score,
								'link':all_raw_posts[i].data.url,
								});
		}
	}

	return cleaned_posts;
}

//Shows the top 15 posts from a provided subreddit, using the provided sorting filter
exports.show_subreddit = function(req, res) {

	var subreddit = req.params.Subreddit;
	var sort = req.params.Sort;
	var errors = {};

	if(!subreddit)
		errors.subreddit = 'No subreddit parameter provided (check URL)';
	if(!sort)
		errors.sort = 'No sort parameter provided (check URL)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	console.log("Returning 15 "+sort+" posts from /r/"+subreddit);
	var raw_data;
	switch(sort){
		case "hot":		
			Reddit.subreddit(subreddit).hot().limit(15).exec(function(data) {
				if(!data)
					return res.status(404).json({error:'No posts found.'});
				return res.json(parseData(data));
			});
			break;
		case "new":
			Reddit.subreddit(subreddit).new().limit(15).exec(function(data) {
				if(!data)
					return res.status(404).json({error:'No posts found.'});
				return res.json(parseData(data));
			});
			break;
		case "top":
			Reddit.subreddit(subreddit).top().limit(15).exec(function(data) {
				if(!data)
					return res.status(404).json({error:'No posts found.'});
				return res.json(parseData(data));
			});
			break;
		case "controversial":
			Reddit.subreddit(subreddit).controversial().limit(15).exec(function(data) {
				if(!data)
					return res.status(404).json({error:'No posts found.'});
				return res.json(parseData(data));
			});
			break;
		default:
			return res.status(400).json({error:'Sort parameter provided is not one of the following: hot, new, top, controversial'});
			break;
	}
};

//Searches the subreddit based on the provided search string, returns 15 matches
exports.search_subreddit = function(req, res) {

	var subreddit = req.params.Subreddit;
	var searchterm = req.body.searchterm;
	var errors = {};

	if(!subreddit)
		errors.subreddit = 'No subreddit parameter provided (check URL)';
	if(!searchterm)
		errors.sort = 'No searchterm parameter provided (check body)';

	if(Object.keys(errors).length > 0)
		return res.status(400).json(errors);

	console.log("Searching in /r/"+subreddit+" for posts that have to do with "+searchterm);
	Reddit.subreddit(subreddit).search(searchterm).limit(15).exec(function(data) {
		if(!data)
			return res.status(404).json({error:'No posts found.'});
		return res.json(parseData(data));
	});
};