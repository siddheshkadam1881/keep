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
var userService = require("../service/user.service");
const redis = require('redis');
const TokenGenerator = require('uuid-token-generator');
var ids = require('short-id');
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
 var random=tokgen.generate();
var cache = new redis.createClient( process.env.PORT);
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },

  filename: function(req, file, callback) {
  file.originalname = Date.now() +random+"_"+ file.originalname;
  callback(null,file.originalname);

  },
});
var upload = multer({
  storage: storage
}).single('image');


/**
* @description  Redis SET use for while CREATE Notes..
* @extends {user_id,user}
*/
var redisSet =  function(user_id,user) {

  cache.get(user_id,function(err,note) {
  var noteCache = [];
  noteCache =JSON.parse(note);
  cache.set(user_id,JSON.stringify(noteCache.concat(user)), redis.print);
  // console.log("hydsbvvv");


  })
}

/**
  * @description Class createNote create note here
  *
  * @class createNote
  * @extends {req, res}
  */


exports.createNote = function(req, res) {
 try
  {
    req.checkBody("title", "Enter the title please").notEmpty();
    req.checkBody("note", "Enter the description.").notEmpty();
    var errors = req.validationErrors();
    if (errors)
    {
      res.send(errors);
      return;
    }
 else
   {
      todoService.createUserTodo(req.body, req.decoded, function(err, note) {
      if (err)
      return next(err);
      res.status(200).json(note);
      });
   }
}
catch (err) {
         return next(err);
     }
}


/**
  * @description Class readTodos use for craete notes here
  * @class createNote
  * @extends {req, res}
  */


exports.readTodos = function(req, res) {

  todoService.readUserTodo(req.decoded, function(err, note) {
    if (err)
     return next(err);
    //res.send(err);
    res.status(200).json(note);
  });
}

/**
*   @description delete function to delete a current note
*  @class delete
*  @extends {req, res}
*/

exports.delete = function(req, res) {

  todoService.deleteUserTodo(req.decoded, req.params, function(err, note) {
    if (err)
      // res.send(err);
      return next(err);
      res.status(200).json({
      message: 'Note successfully deleted'
    });
  });
};




/**
  * @description update function to update a current note
  * @class update
  * @extends {req, res}
  */

exports.update = function(req, res) {
  upload(req, res, function(err) {
    //console.log(req.body)


      var todoObj = req.body || {};
      if(req.file && req.file.path) {
      todoObj.image = req.file.path;
    }

      let noteId =req.params.id;
      let userId =req.decoded;

      todoService.updateUserTodo(userId,noteId,todoObj ,function(err, note) {
      if (err)
      return next(err);
       res.status(200).send(note);
      });

  });
};


/**
  * @description searchTodos function to search Todo a notes..
  * @class searchTodos
  * @extends {req, res}
  */

  exports.searchTodos = function(req, res) {
  let userId =req.decoded;
  let searchKey =req.params.searchKey;
  todoService.searchTodos(userId,searchKey, function(err, note) {
      if (err)
      return next(err);
      res.status(200).json(note);
  });
}




/**
  * @description addAndUpdateCollab function to add collaborator in Todonotes..
  * @class  addAndUpdateCollab
  * @extends {req, res}
  */

 exports.addAndUpdateCollab = function(req, res) {
  //User.findOne({'email':req.params.email}
  let collaborate_email=req.params.email;
   userService.addAndUpdateCollab(collaborate_email,function(err,user) {
   try {
   if(err) return next(err);
   if(!user) res.json('user not found');
    if(user)
    //console.log(user._id);
    {
      var sharedNote = {
                         collaborator:req.params.email
                       }
    }
    let noteId=req.params.noteId;
    todoService.addAndUpdateCollab(noteId ,sharedNote,function(err, note) {
     if (err)
     return next(err);
     res.status(200).json(note);
   });
 }
  catch (err) {
  return next(err);
 }

 })
};



/**
  * @description addAndUpdateCollab function to add collaborator in Todonotes..
  * @class  addAndUpdateCollab
  * @extends {req, res}
  */

 exports.deleteAndUpdateCollab = function(req, res) {
   let collaborate_email=req.params.email;
   userService.deleteAndUpdateCollab(collaborate_email,function(err,user) {
   try {
   if(err) return next(err);
   if(!user) res.json('user not found');
    if(user)
    //console.log(user._id);
    {
    var sharedNote = {
                       collaborator:req.params.email
                     }
    }
   // console.log(sharedNote);

   let noteId=req.params.noteId;
   todoService.deleteAndUpdateCollab(noteId ,sharedNote,function(err, note) {
    if (err)
    return next(err);
    res.status(200).json(note);
  });
}
 catch (err) {
   return next(err);
}


 })
};
