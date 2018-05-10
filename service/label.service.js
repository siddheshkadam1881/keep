var labelModel = require("../model/labelModel");
var User = require("../model/User");


 function Label()
 { }


 Label.prototype.createUserlabel = function (labelObj,userObj,callback) {
   //labelModel.createUserlabel(labelObj,userObj,callback);
   var label = new labelModel();
   label.title = labelObj.title;
   label.user_id =userObj._id;
   label.save(callback);
 };

 Label.prototype.readUserlabel = function (userId,callback) {
   //labelModel.readUserlabel(userId,callback);
  labelModel.find ({ user_id:userId}).sort({created_date: -1}).exec(callback);
 };

 Label.prototype.deleteUserlabel = function (userId,paramId,callback) {
   //labelModel.deleteUserlabel(userId,paramId,callback);
   labelModel.remove({ user_id: userId,_id: paramId.id}).exec(callback);
 };
Label.prototype.updateLabel = function (labelId,userId,requestbody,callback)
{
  labelModel.findOneAndUpdate({_id: labelId,user_id:userId},requestbody,{new: true}).exec(callback);
};




 module.exports = new Label();
