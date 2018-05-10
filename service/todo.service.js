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
   };

/**
  * @description readUserTodo function to read User Todonotes
  * @class  deleteUserTodo
  * @extends {userId,paramId,callback}
  */

    Todo.prototype.deleteUserTodo = function (userId,paramId,callback) {
       TodoModel.deleteUserTodo(userId,paramId,callback);
    };

  /**
    * @description updateUserTodo function to update User Todonotes
    * @class  updateUserTodo
    * @extends {userId,noteId,todoObj,callback}
    */

     Todo.prototype.updateUserTodo = function(userId,noteId,todoObj,callback){
        TodoModel.updateUserTodo(userId,noteId,todoObj,callback);
     };

   /**
     * @description addupdateUserTodo function to add and update User Todonotes
     * @class  updateUserTodo
     * @extends {noteId,sharedNote,callback}
     */
    Todo.prototype.addAndUpdateCollab =function(noteId,sharedNote,callback)
      {
       TodoModel.addAndUpdateCollab(noteId,sharedNote,callback);
      };

    /**
      * @description deleteAndUpdateCollab function to delete and update User Todonotes
      * @class  deleteAndUpdateCollab
      * @extends {noteId,sharedNote,callback}
      */
    Todo.prototype.deleteAndUpdateCollab =function(noteId,sharedNote,callback)
      {
       TodoModel.deleteAndUpdateCollab(noteId,sharedNote,callback);
      }

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
