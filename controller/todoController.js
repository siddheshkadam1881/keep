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
var Collab =require("../model/CollaboratorModel.js");
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
      res.status(200).json(note);
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
    res.status(200).json(note);
  });
}




// exports.update = function(req, res) {
//   upload(req, res, function(err) {
//     //console.log(req.body)
//     var todoObj = req.body || {};
//     if (req.file && req.file.path) {
//       todoObj.image = req.file.path;
//     }
//       var collaboratoremail=req.decoded.email;
//       //console.log(email);
//     Todo.findOneAndUpdate({
//       _id: req.params.id,
//       $or: [
//             { collaborator:{collaboratoremail}},
//             { user_id: req.decoded._id}
//           ]
//       }, todoObj, {
//         new: true
//       },
//       function(err, note) {
//         if (err)
//         //return next(err);
//         res.status(500).send( {
//            err: 'something blew up'
//          });
//       res.status(200).send(note);
//       });
//   });
// };

/**
  * @description update function to update a current note
  * @class update
  * @extends {req, res}
  */


  // ({ $and: [{ user_id:userId },
  //             {$or: [
  //             {title: { $regex: searchKey, $options: "i"}},
  //             {note: { $regex: searchKey, $options: "i"}},
  //             {note_color : { $regex: searchKey, $options: "i"}}
  //             ]}]}).exec(cb);
exports.update = function(req, res) {
  upload(req, res, function(err) {
    //console.log(req.body)
    var todoObj = req.body || {};
    if (req.file && req.file.path) {
      todoObj.image = req.file.path;
    }
      var collaboratoremail=req.decoded.email;
      //console.log(email);
    Todo.findOneAndUpdate({
      $and: [{user_id: req.decoded._id,_id: req.params.id},
             //{$or: [
            // { collaborator:{collaboratoremail}}]}
      ]}, todoObj, {
        new: true
      },
      function(err, note) {
        if (err)
        //return next(err);
        res.status(500).send( {
           err: 'something blew up'
         });
      res.status(200).send(note);
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
      res.status(200).json(note);
  });
}




/**
  * @description addAndUpdateCollab function to add collaborator in Todonotes..
  * @class  addAndUpdateCollab
  * @extends {req, res}
  */

 exports.addAndUpdateCollab = function(req, res) {

   User.findOne({'email':req.params.email},function(err,user) {
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

   Todo.findOneAndUpdate({
      _id: req.params.noteId,
      },{$addToSet:sharedNote},{new:true}, function(err, note) {
     if (err)
       return next(err);

       // redisSet(req.user.id,note);

     res.status(200).json(note);
   });

 }
  catch (e) {
 }

 })
};



/**
  * @description addAndUpdateCollab function to add collaborator in Todonotes..
  * @class  addAndUpdateCollab
  * @extends {req, res}
  */

 exports.deleteAndUpdateCollab = function(req, res) {

   User.findOne({'email':req.params.email},function(err,user) {
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

   Todo.findOneAndUpdate({
      _id: req.params.noteId,
    },{$pull:sharedNote},{new:true}, function(err, note) {
     if (err)
       return next(err);

       // redisSet(req.user.id,note);

     res.status(200).json(note);
   });

 }
  catch (e) {
 }

 })
};

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
      res.status(200).json({
      message: 'Note successfully deleted'
    });
  });
};
