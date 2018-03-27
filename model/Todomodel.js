var mongoose = require('mongoose');

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

  note_chip: {
    type: String
  },
  image: {
     data: Buffer
  }
});

  NoteSchema.statics.createUserTodo = function createUserTodo (todoObj,userObj,cb) {
  //  console.log(todoObj)
  var new_note = new this();
  new_note.title = todoObj.title;
  new_note.note = todoObj.note;
  //new_note.email = req.body.email;
  new_note.user_id =userObj._id;
  new_note.save(cb);
}

// NoteSchema.statics.readUserTodo = function (userId,cb) {
//   this.find({ user_id:userId, is_deleted :false}).exec(cb);
// }



var Todomodel  = mongoose.model('todo', NoteSchema);
module.exports = Todomodel;

















































// is_pinned: {
//   type: Boolean,
//   default: false
// },
// is_archieved: {
//   type: Boolean,
//   default: false
// },
// is_deleted: {
//   type: Boolean,
//   default: false
// },
// label: [{
//   type: String
// }],
// reminder: {
//   type: Date,
//   default: null
// },
//
// collaborator: [{
//   type: String
// }],
// shared_id:[{
//   type:String
// }],
// edited: {
//   type: Date,
//   default: Date.now()
// },
//
