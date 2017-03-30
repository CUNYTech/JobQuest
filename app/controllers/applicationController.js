'use strict';

var mongoose = require('mongoose');
var Application = mongoose.model('Applications'); 

//Shows all applications. Returns every application in the collection.
exports.show_all_applications = function(req, res) {

  if(!req.isValidUser){
    console.log('Request not completed due to lack of authentication');
    return res.status(401).json({error:'User must be logged in to access this function'});
  }

 	Application.find({authorID:req.user._id}, function(err, applications) {
  		if (err)
 			return res.status(500).send(err);
  		console.log("All applications shown");
 		return res.json(applications);
  	});
};

//Creates a new application providing company, role, status and comment (optional). Returns the new application.
exports.create_an_application = function(req, res) {

  if(!req.isValidUser){
    console.log('Request not completed due to lack of authentication');
    return res.status(401).json({error:'User must be logged in to access this function'});
  }

  var company = req.body.company;
  var role = req.body.role;
  var status = req.body.status;
  var comment = req.body.comment;
  var errors = {}

  if(!company)
    errors.company = 'No company parameter provided (check body)';
  if(!role)
    errors.company = 'No role parameter provided (check body)';
  if(!status)
    errors.company = 'No status parameter provided (check body)';

  if(Object.keys(errors).length > 0)
    return res.status(400).json(errors);

 //Create a new application schema.
 //Only company, role and status required
  var new_application = new Application({
    author:req.user.name,
    authorID:req.user._id,
  	company:company,
  	role:role,
  	status:status,
  	comment:comment
  });
  
 //Saves the new application into the Application collection
 new_application.save(function(err, application) {
	if (err)
 		return res.status(500).send(err);
 	console.log('Application successfully created with id:'+application._id);
 	return res.json(application);
  });
};

//Displays an application given an ID. Returns the modified application.
exports.show_an_application = function(req, res) {
	
  var id = req.params.ApplicationId;
  var errors = {};

  if(!id){
    errors.appid = 'No application ID parameter provided (check URL)';
    return res.status(400).json(errors);
  }

	Application.findById(id, function(err, application) {
		if (err)
			  return res.status(500).send(err);
		
    if(application == null){
      errors.appid = 'Application id:'+id+' not found';
      return res.status(404).json(errors);
    }

		console.log('Displaying application with id:'+id)
		return res.json(application);	
	});
};

//Edits either an application's company, role, status or comment. Returns the modified application.
exports.edit_an_application = function(req, res) {

  if(!req.isValidUser){
    console.log('Request not completed due to lack of authentication');
    return res.status(401).json({error:'User must be logged in to access this function'});
  }

 	var id = req.params.ApplicationId;
  var errors = {};

  if(!id){
    errors.appid = 'No application ID parameter provided (check URL)';
    return res.status(400).json(errors);
  }

 	Application.findOne({_id:id, authorID:req.user._id}, function(err, application) {
 		if (err)
 			return res.status(500).send(err);
    if(application == null) {
      Application.count({_id:id}, function(err, count) {
        if(count > 0) {
          errors.userid = 'User does not have permission to modify this application';
          return res.status(401).json(errors);
        }
        else {
          errors.appid = 'Application id:'+id+' not found';
          return res.status(404).json(errors);
        }
      });
    }
    else {
   		//Sets a new value to company, role, status or comment ONLY if a new title/thread value is provided.
   		//Otherwise, it will retain its old value
   		application.company = req.body.company || application.company;
   		application.role = req.body.role || application.role;
   		application.status = req.body.status || application.status;
  		application.comment = req.body.comment || application.comment;
   
   		application.save(function(err, application) {
   			if(err)
   				return res.status(500).send(err);
   			console.log('Application id:'+id+' successfully updated');
   			return res.json(application);
   		});
    }
 	});
};

//Removes an application. Returns a success message.
exports.remove_an_application = function(req, res) {

  if(!req.isValidUser){
    console.log('Request not completed due to lack of authentication');
    return res.status(401).send('User must be logged in to access this function');
  }

	var id = req.params.ApplicationId;
  var errors = {};

  if(!id){
    errors.appid = 'No application ID parameter provided (check URL)';
    return res.status(400).json(errors);
  }

	Application.findOne({_id:id, authorID:req.user._id}, function(err, application) {
		if (err)
			return res.status(500).send(err);
    if(application == null) {
      Application.count({_id:id}, function(err, count) {
        if(count > 0) {
          errors.userid = 'User does not have permission to modify this application';
          return res.status(401).json(errors);
        }
        else {
          errors.appid = 'Application id:'+id+' not found';
          return res.status(404).json(errors);
        }
      });
    }
    else {
      //Remove application
  		application.remove();
  		console.log('Application id:'+id+' successfully removed');
  		return res.send('Application removed');
    }
  });
};
