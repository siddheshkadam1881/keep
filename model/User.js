 var mongoose = require('mongoose');
 var bcrypt = require('bcrypt');

  var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userpass: {
    type: String,
    required: true,
  },
  usermobile: {
    type: Number,
    required: true,
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

// email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id}, 'RESTFULAPIs'







  var User = mongoose.model('User', User);
  module.exports = User;
