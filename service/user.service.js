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

User.prototype.signUp = function (userObj,roleObj,callback) {
  console.log(roleObj);
  UserModel.signUp(userObj,roleObj,callback);
};


User.prototype.addAndUpdateCollab = function (userObj,callback) {
  UserModel.findOne({'email':userObj},callback);
};


User.prototype.deleteAndUpdateCollab = function (userObj,callback) {
  UserModel.findOne({'email':userObj},callback);
};








module.exports = new User();
