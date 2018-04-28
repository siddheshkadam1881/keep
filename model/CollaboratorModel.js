var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collaboratorSchema = new Schema({

  user_id:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  note_id:{
    type:String,
    ref:'Todomodel'
  },
  collaborators_id: [{
    type:String
  }]
})
var collaboratorModel = mongoose.model('collabs',collaboratorSchema);
module.exports = collaboratorModel;
