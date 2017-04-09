'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/jobquest'); 
mongoose.connect('mongodb://localhost:27017/jobquest');
var shortId = require('shortid');

var CommentSchema = new Schema({
  _id: {
    type:String,
    'default':shortId.generate
  },
  author:String,
  authorID:String,
  text:String,
  created_at: {
    type:Date,
    default:Date.now
  }
});

var PostSchema = new Schema({
  _id: {
    type:String,
    'default':shortId.generate
  },
  author:String,
  authorID:String,
  title: {
    type:String,
    required:true
  },
  thread: {
    type:String,
    required:true
  },
  votes: {
    type:Number,
    default:0,
    required:true
  },
  created_at: {
    type:Date,
    default:Date.now,
    required:true
  },
  comments:[CommentSchema],
  votedOn: [{
    _id:false,
    userID: String,
    value: Number
  }]
});

var ApplicationSchema = new Schema({
  _id: {
    type:String,
    'default':shortId.generate
  },
  author:String,
  authorID:String,
  company: {
    type:String,
    required:true
  },
  role: {
    type:String,
    required:true
  },
  status: {
    type:String,
    required:true
  },
  comment: {
    type:String,
    required:false
  },
  created_at: {
    type:Date,
    default:Date.now,
    required:true
  }
});


// define the User model schema
const UserSchema = new mongoose.Schema({
  _id: {
    type:String,
    'default':shortId.generate
  },
  email: {
    type: String,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default:false
  }
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('Posts', PostSchema);
module.exports = connection.model('Applications', ApplicationSchema);
module.exports = connection.model('Comments', CommentSchema);
module.exports = connection.model('User', UserSchema);