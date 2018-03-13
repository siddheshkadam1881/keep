var mongoose = require('mongoose');
var labelSchema = new mongoose.Schema({
  title: {
    type:String
  }
});
var labelModel = mongoose.model('labels',labelSchema);
module.exports = labelModel;
