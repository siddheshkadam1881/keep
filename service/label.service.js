var labelModel = require("../model/labelModel");
var User = require("../model/User");


 function Label()
 { }


 Label.prototype.createUserlabel = function (labelObj,userObj,callback) {
   labelModel.createUserlabel(labelObj,userObj,callback);
 };

 Label.prototype.readUserlabel = function (userId,callback) {
   labelModel.readUserlabel(userId,callback);
 };

 Label.prototype.deleteUserlabel = function (userId,paramId,callback) {
   labelModel.deleteUserlabel(userId,paramId,callback);
 };

 module.exports = new Label();
