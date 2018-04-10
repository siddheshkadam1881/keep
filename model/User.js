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

User.statics.showProfile = function(paramId,cb)
{
  this.find({ email: paramId.email }).exec(cb);
}

User.statics.signIn = function(userObj,cb)
{
   this.findOne({email: userObj.email}).exec(cb);
}

User.statics.signUp = function (userObj,callback) {
  console.log(userObj.email);
   var user = new this();
   user.email = userObj.email,
   user.username = userObj.username,
   user.usermobile = userObj.usermobile,
   user.userpass = bcrypt.hashSync(userObj.userpass, 10);
   user.save(callback);
};



User.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
    var that = this;
    return this.findOne({
      //'facebookProvider.token': profile.accessToken
      'facebookProvider.id': profile.id
    }, function(err, user) {

      if (!user) {
        var newUser = new that({
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.picture,
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
