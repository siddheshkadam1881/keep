/******************************************************************************
*  Purpose         : Rest api of note write here..
*
*  @description
*
*  @file           : todoController.js
*  @overview       : rest api of note write here..
*  @author         : siddheshwar kadam
*  @version        : 1.0
*  @since          : 06-08-2017
*******************************************************************************/

var express = require("express");
var Todo = require("../model/Todomodel");
var User = require("../model/User");
var multer = require('multer');
var todoService = require("../service/todo.service");
const redis = require('redis');
var cache = new redis.createClient( process.env.PORT);
console.log(cache);
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({
  storage: storage
}).single('image');


/**
* @description  Redis SET use for while CREATE Notes..
* @extends {req, res}
*/
var redisSet =  function(user_id,user) {

  cache.get(user_id,function(err,note) {
  var noteCache = [];
  noteCache =JSON.parse(note);
  console.log("note cache \n"+ note);
  console.log("user cache \n"+ user);
  cache.set(user_id,JSON.stringify(noteCache.concat(user)), redis.print);
  // console.log("hydsbvvv");
  console.log(cache);

  })
}

/**
  * @description Class createNote craete note here
  *
  * @class createNote
  * @extends {req, res}
  */

exports.createNote = function(req, res) {
  // console.log(req.body);
  // console.log(req.decoded);
  todoService.createUserTodo(req.body, req.decoded, function(err, user) {
    if (err)
      res.json({
        success: false,
        message: 'Note cannot create'
      })
    res.json({
      success: true,
      message: 'Note successfully create'
    });
  // (req.decoded._id,user);
   redisSet(req.decoded._id,user);
  });
}

/**
  * @description Class readTodos use for craete notes here
  * @class createNote
  * @extends {req, res}
  */


exports.readTodos = function(req, res) {

  todoService.readUserTodo(req.decoded, function(err, note) {
    if (err)
      res.send(500, {
        err: 'something blew up'
      });
    //res.send(err);
    res.json(note);
  });

}

/**
  * @description update function to update a current note
  * @class update
  * @extends {req, res}
  */

exports.update = function(req, res) {
  console.log(req.body);
  upload(req, res, function(err) {
    var todoObj = req.body || {};
    if (req.file && req.file.path) {
      todoObj.image = req.file.path;
    }
    Todo.findOneAndUpdate({
        _id: req.params.id,
        user_id: req.decoded._id
      }, todoObj, {
        new: true
      },
      function(err, note) {
        if (err)
          res.send(err);
        res.json(note);
      });
  });
};

/**
*   @description delete function to delete a current note
*  @class delete
*  @extends {req, res}
*/

exports.delete = function(req, res) {

  todoService.deleteUserTodo(req.decoded, req.params, function(err, note) {
    if (err)
      res.send(err);
    res.json({
      message: 'Note successfully deleted'
    });
  });
};
