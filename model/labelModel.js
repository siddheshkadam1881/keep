var mongoose = require('mongoose');
var labelSchema = new mongoose.Schema({
  title: {
    type:String
  },
  user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'}

});
var labelModel = mongoose.model('labels',labelSchema);
module.exports = labelModel;
