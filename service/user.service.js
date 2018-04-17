/***
*
*/
var secretConfig = require('../config/config');

// var secret = 'my-secret'; //Read from config
var UserModel = require("../model/User");



var jwt = require('jsonwebtoken');

function User(){

}

User.prototype.generateJwt = function (userObj) {
  return jwt.sign(userObj,secretConfig.secret);
};


User.prototype.verifyJwt = function (token,callback) {
jwt.verify(token,secretConfig.secret ,callback);
}

User.prototype.showProfile = function (paramId,callback) {
  UserModel.showProfile(paramId,callback);
};
User.prototype.signIn = function (userObj,callback) {
  UserModel.signIn(userObj,callback);
};

User.prototype.signUp = function (userObj,callback) {
  UserModel.signUp(userObj,callback);
};






module.exports = new User();
