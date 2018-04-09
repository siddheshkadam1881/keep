/***
*
*/
//var secret = require('../config/config');
var secret = 'my-secret'; //Read from config



var jwt = require('jsonwebtoken');

function User(){

}

User.prototype.generateJwt = function (userObj) {
  return jwt.sign(userObj,secret);
};


User.prototype.verifyJwt = function (token,callback) {
jwt.verify(token,secret ,callback);
}





module.exports = new User();
