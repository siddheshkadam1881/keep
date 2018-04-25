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
  * @description Class createNote craete note here
  *
  * @class createNote
  * @extends {req, res}
  */

exports.createNote = function(req, res) {

  todoService.createUserTodo(req.body, req.decoded, function(err, note) {
    if (err)
      return next(err);
      res.json(note);
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
     return next(err);

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
  upload(req, res, function(err) {
    console.log(req.body)
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
        //return next(err);
        res.status(500).send( {
           err: 'something blew up'
         });
        res.json(note);
      });
  });
};


/**
  * @description searchTodos function to search Todo a notes..
  * @class update
  * @extends {req, res}
  */


exports.searchTodos = function(req, res) {

  todoService.searchTodos(req.decoded,req.params.searchKey, function(err, note) {
    if (err)
      return next(err);
      // res.status(500).send( {
      //   err: 'something blew up'
      // });
    //res.send(err);
    res.json(note);
  });
}




/**
  * @description searchTodos function to search Todo a notes..
  * @class addAndUpdateCollab
  * @extends {req, res}
  */
//
// exports.addAndUpdateCollab = function(req, res) {
//   console.log(req.body.email);
//   User.findOne({'local.email':req.body.email},{'local.password':0,'local.profile':0},function(err,user) {
// console.log(user);
// try {
//   if(err) res.send(err)
//   if(!user) res.json('user not found');
//
//   var data  = {
//     collaborators_id:user._id
//   }
//   var sharedNote = {
//     shared_id:user._id,
//     collaborator:user.local.email
//   }
//
//   Note.findOneAndUpdate({
//     _id: req.params.noteId,
//   },{$push:sharedNote},{new:true}, function(err, note) {
//     if (err)
//       res.send(err);
//       Collab.findOneAndUpdate({ note_id:req.params.noteId},{$push:data},{new:true},
//         function(err,res) {
//           console.log(res);
//       })
//       // redisSet(req.user.id,note);
//
//     res.json(note);
//   });
//
// } catch (e) {
//
// }
//
//   })
// };

/**
*   @description addNoteToLabel function to add Label to note
*   @class addLabelToNote
*  @extends {req, res}
*/

exports.labelToNoteHandler = function(req, res) {
  var operation = req.query.operation;
  if (operation == "add") {
    Todo.update({
        _id: req.params.id,
    user_id: req.decoded._id
      }, {
        $push: {
          label_ids: req.param.labelId
        }
      },
      function(err, updatedNoteData) {
        if (err) throw err;
        else {
          res.send({
            'message': 'label has added for note'
          });
        }
      })
  }else if (operation == "remove") {
      Todo.update({
          _id: req.params.id,
      user_id: req.decoded._id
        }, {
          $pull: {
            label_ids:req.param.labelId
          }
        },
        function(err, updatedNoteData) {
          if (err) return next(err);
          else {
            res.send({
              'message': 'label has removed for note'
            });
          }
        })
  }else {

      res.send({
        status :false,
        'message': 'Invalid Opertion'
      });
  }

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
     res.json({
      message: 'Note successfully deleted'
    });
  });
};
