var TodoModel = require("../model/Todomodel");
var User = require("../model/User");


function Todo(){

}

/**
  * @description createUserTodo function to create Todonotes..
  * @class  createUserTodo
  * @extends {todoObj,userObj,callback}
  */

Todo.prototype.createUserTodo = function (todoObj,userObj,callback) {
  TodoModel.createUserTodo(todoObj,userObj,callback);
};

/**
  * @description readUserTodo function to read User Todonotes
  * @class  readUserTodo
  * @extends {userId,callback}
  */

  Todo.prototype.readUserTodo = function (userId,callback) {
   TodoModel.readUserTodo(userId,callback);
    //TodoModel.find({ $or: [{user_id:userId},{collaborator:userId.email}]}).sort({created_date: -1}).limit(10).exec(callback);
  };

/**
  * @description readUserTodo function to read User Todonotes
  * @class  deleteUserTodo
  * @extends {userId,paramId,callback}
  */

Todo.prototype.deleteUserTodo = function (userId,paramId,callback) {
   TodoModel.deleteUserTodo(userId,paramId,callback);
  //TodoModel.remove({ user_id: userId, _id:paramId.id }).exec(callback);
};

/**
  * @description updateUserTodo function to update User Todonotes
  * @class  updateUserTodo
  * @extends {userId,noteId,todoObj,callback}
  */
 Todo.prototype.updateUserTodo = function(userId,noteId,todoObj,callback){
  // TodoModel.updateUserTodo(userId,paramId,callback);
  TodoModel.updateUserTodo(userId,noteId,todoObj,callback);
  // TodoModel.findOneAndUpdate({ _id:noteId},todoObj,{new: true}).exec(callback);
 };

 /**
   * @description addupdateUserTodo function to add and update User Todonotes
   * @class  updateUserTodo
   * @extends {noteId,sharedNote,callback}
   */
Todo.prototype.addAndUpdateCollab =function(noteId,sharedNote,callback)
{
 TodoModel.addAndUpdateCollab(noteId,sharedNote,callback);
 // TodoModel.findOneAndUpdate({_id: noteId },{$addToSet:sharedNote},{new:true}).exec(callback);
};

/**
  * @description deleteAndUpdateCollab function to delete and update User Todonotes
  * @class  deleteAndUpdateCollab
  * @extends {noteId,sharedNote,callback}
  */
Todo.prototype.deleteAndUpdateCollab =function(noteId,sharedNote,callback)
{
 TodoModel.deleteAndUpdateCollab(noteId,sharedNote,callback);
 //TodoModel.findOneAndUpdate({_id: noteId },{$pull:sharedNote},{new:true}).exec(callback);
};

/**
  * @description searchTodos function to search User Todonotes
  * @class  searchTodos
  * @extends {userId,searchKey,callback}
  */
  Todo.prototype.searchTodos = function (userId,searchKey,callback)
   {
       TodoModel.searchTodos(userId,searchKey,callback);
  };

module.exports = new Todo();
