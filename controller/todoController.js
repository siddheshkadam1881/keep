var express = require("express");
var Todo = require("../model/Todomodel");
var User = require("../model/User");
var multer  = require('multer');
// create todo notes here...
exports.createNote = function(req, res) {
  console.log(req.body);


  var new_note = new Todo();
  new_note.title = req.body.title;
  new_note.note = req.body.note;
  //new_note.email = req.body.email;
  //new_note.user_id =req.body.user_id;
  new_note.save(function(err, user) {
    if (err)
      res.send(err);
      console.log(user);
      res.json(user);
  });
}

//Read Todo notes here...
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

//read specific TodobyId
exports.readTodoById = function(req, res) {
 console.log(req.params.id);
   Todo.findById(req.params.id, function(err, note) {
     if (err)
     res.send(err);
     res.json(note);
   });
}

// update function to update a current note
exports.update = function(req, res) {
 Todo.findOneAndUpdate({
   _id: req.params.id,
 //  user_id:req.user.id
 }, req.body, {
   new: true
 }, function(err, note) {
   if (err)
     res.send(err);

   res.json(note);
 });
};

//delete function to delete a current notes
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
