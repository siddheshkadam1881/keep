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

  todoService.createUserTodo(req.body,function(err, user) {
    if (err)
      res.send(err);
      // {
      // status:boolean,message:"Successfully Todo Created"
      // }
      res.json(user);
  });
}

/*************************
Read Todo notes here
************************/
exports.readTodos = function(req, res) {
   Todo.find({
   // find by id and email
   //user_id:req.user.id

   }, function(err, note) {
     if (err)
     res.send(500, { err: 'something blew up' });
     //res.send(err);
     res.json(note);
   });
}

/*************************
read specific TodobyId
************************/
exports.readTodoById = function(req, res) {
 console.log(req.params.id);
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

  upload(req,res,function(err){
    var todoObj = req.body || {};
    if(req.file && req.file.path){
      todoObj.image = req.file.path;
    }
    Todo.findOneAndUpdate({
     _id : req.params.id
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
exports.delete = function(req, res) {
 Todo.remove({
   _id: req.params.id,
 }, function(err, note) {
   if (err)
     res.send(err);
   res.json({
     message: 'Note successfully deleted'
   });
 });
};
