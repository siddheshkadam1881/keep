/****************************
@file   : TodoModel.js
@author   siddheshwar kadam
@version 1.0
*****************************/


var mongoose = require('mongoose');
var labelModel = require("../model/labelModel");

var NoteSchema = new mongoose.Schema({


  created_date: {
    type: Date,
    default: Date.now
  },
   user_id: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  label_ids:[{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Label'
  }],
  collabrator_ids:[{
  type: String,
  default: ""
  }],
   label:
   {
     type: String,
      default: ""
     //required: 'enter note'
   },
  reminder: {
    type: Date,
  },

  title: {
    type: String,
     default: ""
    //unique: true
  },
  note: {
    type: String,
     default: ""
    //required: 'enter note'
  },
  email: {
    type: String
  },
  is_deleted: {
    type: Boolean,
     default: false
   },
   is_archieved: {
     type: Boolean,
     default: false
 },
 is_pinned: {
   type: Boolean,
   default: false
 },
 note_color: {
    type: String
  },
  reminder: {
     type: Date,
     default: null
   },
  collaborator: [{
    type: String,
    default: ""
  }],
  shared_id:[{
    type:String
  }],
  note_chip: {
    type: String
  },
  image: {
     data: Buffer
  }
});



  NoteSchema.statics.createUserTodo = function createUserTodo (todoObj,userObj,callback) {
  var new_note = new this();
  new_note.title = todoObj.title;
  new_note.note = todoObj.note;
  new_note.label_ids= todoObj.label_ids;
  new_note.collaborator=todoObj.collaborator;
  //new_note.email = req.body.email;
  new_note.user_id =userObj._id;
  new_note.label =userObj.label;
  new_note.save(callback);
}


//collection.find().sort({created_date: -1},
NoteSchema.statics.readUserTodo = function (userId,cb) {
this.find({ $or: [{user_id:userId},{collaborator:userId.email}]}).sort({created_date: -1}).exec(cb);
}

NoteSchema.statics.deleteUserTodo = function (userId,paramId,cb) {
this.remove({ user_id: userId, _id:paramId.id }).exec(cb);
  //this.remove({ user_id: userId, _id:paramId.id }).exec(cb);
}

NoteSchema.statics.searchTodos = function (userId,searchKey,cb) {
     this.find({ $and: [{ user_id:userId },
               {$or: [
               {title: { $regex: searchKey, $options: "i"}},
               {note: { $regex: searchKey, $options: "i"}},
               {note_color : { $regex: searchKey, $options: "i"}}
               ]}]}).exec(cb);
}

NoteSchema.statics.updateUserTodo=function (userId,noteId,todoObj,callback)
{
   this.findOneAndUpdate({ _id:noteId},todoObj,{new: true}).exec(callback);
}

NoteSchema.statics.addAndUpdateCollab = function (noteId,sharedNote,callback)
{
  this.findOneAndUpdate({_id: noteId },{$addToSet:sharedNote},{new:true}).exec(callback);
}

NoteSchema.statics.deleteAndUpdateCollab =function(noteId,sharedNote,callback)
{
  this.findOneAndUpdate({_id: noteId },{$pull:sharedNote},{new:true}).exec(callback);
}





var Todomodel  = mongoose.model('Todo', NoteSchema);
module.exports = Todomodel;
