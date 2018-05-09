/****************************
@file   : labelModel.js
@author siddheshwar kadam
@version 1.0
*****************************/


var mongoose = require('mongoose');
var labelSchema = new mongoose.Schema({
  title: {
    type:String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'}

});

var labelModel = mongoose.model('labels',labelSchema);
module.exports = labelModel;

























//
// labelSchema.statics.createUserlabel = function createUserlabel (todoObj,userObj,cb) {
// //  console.log(todoObj)
// var label = new this();
// label.title = todoObj.title;
// label.user_id =userObj._id;
// label.save(cb);
// }
//
//
// labelSchema.statics.readUserlabel = function (userId,cb) {
//   this.find ({ user_id:userId}).sort({created_date: -1}).exec(cb);
// }
// //
//
// labelSchema.statics.deleteUserlabel = function (userId,paramId,cb) {
//
//   this.remove({ user_id: userId,_id: paramId.id}).exec(cb);
// }
