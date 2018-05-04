/****************************
@file   : TodoModel.js
@author siddheshwar kadam
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


// Todomodel.findOne().populate('label_ids').exec(function(err, labes) {
//   if (err) { return console.log(err); }
//
//   console.log(labes.label_ids.title);
// });

  NoteSchema.statics.createUserTodo = function createUserTodo (todoObj,userObj,cb) {
  //  console.log(todoObj)
   // req.checkBody("title", "Enter title.").notEmpty();
   // req.checkBody("note", "Enter title.").notEmpty();

  var new_note = new this();
  new_note.title = todoObj.title;
  new_note.note = todoObj.note;
  new_note.label_ids= todoObj.label_ids;
  new_note.collaborator=todoObj.collaborator;
  //new_note.email = req.body.email;
  new_note.user_id =userObj._id;
  new_note.label =userObj.label;

  new_note.save(cb);
}

NoteSchema.statics.readUserTodo = function (userId,cb) {
  // console.log(userId.email);
     this.find({ $or: [{user_id:userId},{collaborator:userId.email}]}).exec(cb);
}

NoteSchema.statics.deleteUserTodo = function (userId,paramId,cb) {

  this.remove({ $or: [ {user_id: userId},{_id: paramId.id},{collaborator:userId.email}]}).exec(cb);
}

//todoService.serachResult(req.decoded, req.params,


NoteSchema.statics.searchTodos = function (userId,searchKey,cb) {
   this.find ({ $and: [{ user_id:userId },
               {$or: [
               {title: { $regex: searchKey, $options: "i"}},
               {note: { $regex: searchKey, $options: "i"}},
               {note_color : { $regex: searchKey, $options: "i"}}
               ]}]}).exec(cb);
}


// NoteSchema.updateUserTodo(paramId,userId,todoObj,callback)
// {
//    this.findOneAndUpdate({ _id:paramId.id, user_id: userId._id,todoObj}).exec(cb);
// }

var Todomodel  = mongoose.model('Todo', NoteSchema);
module.exports = Todomodel;
