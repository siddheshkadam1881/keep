var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  reminder: {
    type: Date,
  },
  // user_id: {
  //   type: String,
  //   ref: 'UserData'
  // },
  title: {
    type: String
    //unique: true
  },
  note: {
    type: String
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
   }
});
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
