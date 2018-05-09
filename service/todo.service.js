var TodoModel = require("../model/Todomodel");
var User = require("../model/User");


function Todo(){

}

Todo.prototype.createUserTodo = function (todoObj,userObj,callback) {
  var new_note = new TodoModel();
  new_note.title = todoObj.title;
  new_note.note = todoObj.note;
  new_note.label_ids= todoObj.label_ids;
  new_note.collaborator=todoObj.collaborator;
  //new_note.email = req.body.email;
  new_note.user_id =userObj._id;
  new_note.label =userObj.label;
  new_note.save(callback);
};


Todo.prototype.readUserTodo = function (userId,callback) {
  TodoModel.find({ $or: [{user_id:userId},{collaborator:userId.email}]}).sort({created_date: -1}).limit(10).exec(callback);
};

Todo.prototype.deleteUserTodo = function (userId,paramId,callback) {
  TodoModel.remove({ user_id: userId, _id:paramId.id }).exec(callback);
};

 // Todo.prototype.updateUserTodo(paramId,todoObj,callback){
 //   // TodoModel.findOneAndUpdate({
 //   //  _id: paramId.id,
 //   //  }, todoObj, {
 //   //    new: true
 //   //  }).exec(callback);
 //  console.log(paramId);
 //  console.log(todoObj);
 //  //TodoModel.findOneAndUpdate({ _id:paramId.id,todoObj,{new: true}}).exec(callback);
 // };


  Todo.prototype.searchTodos = function (userId,searchKey,callback)
   {

       TodoModel.find({ $and: [{ user_id:userId },
                   {$or: [
                   {title: { $regex: searchKey, $options: "i"}},
                   {note: { $regex: searchKey, $options: "i"}},
                   {note_color : { $regex: searchKey, $options: "i"}}
                   ]}]}).exec(cllback);

  };

module.exports = new Todo();
