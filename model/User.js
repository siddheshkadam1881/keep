/****************************
@file   : User.js
@author siddheshwar kadam
@version 1.0
*****************************/
 var mongoose = require('mongoose');
 var bcrypt = require('bcrypt');

 const saltRounds = 10;
 //const myPlaintextPassword = 's0/\/\P4$$w0rD';
 var jwt = require('jsonwebtoken');

  var User = new mongoose.Schema({

   username: {
    type: String,
    // unique: true,
    default: "",
    trim: true
  },
  email: {
    type: String,
    // unique: true,
     default: "",
    trim: true
  },
  userpass: {
    type: String,
     required: true,
     default: "hello"
  },
  usermobile: {
    type: Number,
    default: ""
  },
  reset_password_token: {
   type: String
 },
 reset_password_expires: {
   type: Date,
   default: Date.now
 },
 image: {
    data: Buffer
 },
 facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
});

 User.methods.comparePassword=function(userpass){
 return bcrypt.compareSync(userpass,this.userpass);
};

  User.statics.sign = function sign (userObj,callback) {
  var user_jwt = new this();
  user_jwt.email = userObj.email,
  user_jwt.username = userObj.username,
  user_jwt.usermobile = userObj.usermobile,
  user_jwt._id = userObj._id
  user_jwt.save(callback);

};
// NoteSchema.statics.deleteUserTodo = function (userId,paramId,cb) {
//   console.log(userId);
//   console.log(paramId);
//   this.remove({ user_id: userId,_id: paramId.id}).exec(cb);
// }

User.statics.showProfile = function(paramId,cb)
{
  this.find({ email: paramId.email }).exec(cb);
}

User.statics.signIn = function(userObj,cb)
{
   this.findOne({email: userObj.email}).exec(cb);
}

// User.prototype.signUp = function (userObj,callback) {
//   // UserModel.signUp(userObj,callback);
//    var user = new User(userObj);
//    user.userpass = bcrypt.hashSync(userObj.userpass, 10);
//    user.save(callback);
// };



User.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
      //'facebookProvider.token': profile.accessToken
      'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
       // console.log(user.email);
      if (!user) {
        var newUser = new that({
          username: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id
            // token: accessToken
          }
        });
        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };




// email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id}, 'RESTFULAPIs'
  var User = mongoose.model('User', User);
  module.exports = User;
