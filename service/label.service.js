var labelModel = require("../model/labelModel");
var User = require("../model/User");


 function Label()
 { }

 /**
   * @description createUserlabel function to create label..
   * @class  createUserlabel
   * @extends {labelObj,userObj,callback}
   */


 Label.prototype.createUserlabel = function (labelObj,userObj,callback) {
   var label = new labelModel();
   label.title = labelObj.title;
   label.user_id =userObj._id;
   label.save(callback);
 };


 /**
   * @description readUserlabel function to read label
   * @class  readUserlabel
   * @extends {userId,callback}
   */


 Label.prototype.readUserlabel = function (userId,callback) {
  labelModel.find ({ user_id:userId}).sort({created_date: -1}).exec(callback);
 };

 /**
   * @description deleteUserlabel function to delete label
   * @class  deleteUserlabel
   * @extends {userId,paramId,callback}
   */

 Label.prototype.deleteUserlabel = function (userId,paramId,callback) {
   labelModel.remove({ user_id: userId,_id: paramId.id}).exec(callback);
 };

 /**
   * @description updateLabel function to update Label
   * @class  updateLabel
   * @extends {labelId,userId,requestbody,callback}
   */

Label.prototype.updateLabel = function (labelId,userId,requestbody,callback)
{
  labelModel.findOneAndUpdate({_id: labelId,user_id:userId},requestbody,{new: true}).exec(callback);
};




 module.exports = new Label();
