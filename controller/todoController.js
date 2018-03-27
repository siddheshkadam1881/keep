/****************************
@author siddheshwar kadam
@version 1.0
*****************************/

var express = require("express");
var Todo = require("../model/Todomodel");
var User = require("../model/User");
var multer  = require('multer');
var todoService = require("../service/todo.service");

var storage =multer.diskStorage({
destination :function(req,file,callback)
{
  callback( null,'./uploads');
},
filename:function(req,file,callback)
{
  callback(null,file.originalname);
},
});
var upload = multer({storage : storage}).single('image');

/****************************
create todo notes api here...
*****************************/
exports.createNote = function(req, res) {

    console.log(req.decoded);
  todoService.createUserTodo(req.body,req.decoded,function(err, user) {
    if (err)
    res.json({success:false,
      message: 'Note cannot create'
    })
      res.json({success:true,
        message: 'Note successfully create'
      });
  });
}

/*************************
Read Todo notes here
************************/
exports.readTodos = function(req, res) {
   console.log(req.decoded);
   Todo.find({
     user_id : req.decoded._id
   }, function(err, note) {
     if (err)
     res.send(500, { err:'something blew up' });
     //res.send(err);
     res.json(note);
   });

}
/*************************
read specific TodobyId
************************/
exports.readTodoById = function(req, res) {

   Todo.findById(req.params.id, function(err, note) {
     if (err)
     res.send(err);
     res.json(note);
   });
}


/**************************************
update function to update a current note
*************************************/

exports.update = function(req, res) {
    console.log(req.decoded);
    upload(req,res,function(err){
    var todoObj = req.body || {};
    if(req.file && req.file.path){
      todoObj.image = req.file.path;
    }
    Todo.findOneAndUpdate({
     _id : req.params.id,
  user_id : req.decoded._id
     },todoObj , {
   new: true
 },
 function(err, note) {
     if (err)
     res.send(err);
   res.json(note);
   });
 });
};

/******************************************
delete function to delete a current notes
*****************************************/
  console.log(req.decoded);
exports.delete = function(req, res) {
 Todo.remove({
   _id: req.params.id,
   user_id : req.decoded._id
 }, function(err, note) {
   if (err)
     res.send(err);
   res.json({
     message: 'Note successfully deleted'
   });
 });
};
