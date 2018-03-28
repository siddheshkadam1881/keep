var mongoose = require('mongoose');
var labelSchema = new mongoose.Schema({
  title: {
    type:String
  },
  user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'}

});


labelSchema.statics.createUserlabel = function createUserlabel (todoObj,userObj,cb) {
//  console.log(todoObj)
var label = new this();
label.title = todoObj.title;
label.user_id =userObj._id;
label.save(cb);
}


labelSchema.statics.readUserlabel = function (userId,cb) {
  this.find ({ user_id:userId}).exec(cb);
}
//
var labelModel = mongoose.model('labels',labelSchema);
module.exports = labelModel;
