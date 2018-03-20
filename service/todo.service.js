var TodoModel = require("../model/Todomodel");


function Todo(){

}

Todo.prototype.createUserTodo = function (todoObj,callback) {
  TodoModel.createUserTodo(todoObj,callback);
};


Todo.prototype.readUserTodo = function (userId,callback) {
  TodoModel.readUserTodo(userId,callback);
};

module.exports = new Todo();
