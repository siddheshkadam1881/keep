var TodoModel = require("../model/Todomodel");
var User = require("../model/User");


function Todo(){

}

Todo.prototype.createUserTodo = function (todoObj,userObj,callback) {
  TodoModel.createUserTodo(todoObj,userObj,callback);
};


Todo.prototype.readUserTodo = function (userId,callback) {
  TodoModel.readUserTodo(userId,callback);
};

Todo.prototype.deleteUserTodo = function (userId,paramId,callback) {

  TodoModel.deleteUserTodo(userId,paramId,callback);
};

// Todo.prototype.updateUserTodo = function (paramId,userId,todoObj,callback) {
//
//   TodoModel.updateUserTodo(paramId,userId,todoObj,callback);
// };


module.exports = new Todo();
