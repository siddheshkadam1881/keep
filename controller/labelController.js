/******************************************************************************
*  Purpose         : Rest api of label write here..
*
*  @description
*
*  @file           : labelController.js
*  @overview       : rest api of label write here..
*  @author         : siddheshwar kadam
*  @version        : 1.0
*  @since          : 06-08-2017
*******************************************************************************/

var express = require("express");
var Label = require("../model/labelModel");
var labelService = require("../service/label.service");
var User = require("../model/User");


/**
* @description Class createNote  use for create note here
*
* @class createNote
* @extends {req, res}
**/
 exports.createLabel = function(req, res) {

   labelService.createUserlabel(req.body,req.decoded,function(err, user) {
     if (err)
     return next(err);
       res.json({success:true,
         message: 'label successfully create'
       });
   });

 }

/****************************
* @description Class read Label  use for create note here
*
* @class read Label
* @extends {req, res}
 *************************/
 exports.readLabel = function(req, res) {

   labelService.readUserlabel(req.decoded,function(err, note) {
      if (err)
      return next(err);
      //res.send(err);
      res.json(note);
    });
 }



/**
* @description Class readLabel  use for particular label note here
*
* @class  Label
* @extends {req, res}
 */
 // exports.label= function(req, res) {
 //
 //      Label.findOne({
 //       _id : req.params.id
 //  }, function(err, label) {
 //        if (err)
 //        return next(err);
 //        res.json(label);
 //     });
 //  };



 /**
 * @description Class update Label  use for update note here
 * @class update Label
 * @extends {req, res}
 */

exports.updateLabel = function(req, res) {

 Label.findOneAndUpdate({
   _id: req.params.id,
  user_id:req.decoded._id
  },req.body, {
   new: true
 }, function(err, label) {
   if (err)
     return next(err);
     res.json(label);
 });
};



/**
* @description Class deleteLabel  use for delete Label here
* @class delete Label
* @extends {req, res}
 **/
 exports.deleteLabel = function(req, res) {
  labelService.deleteUserlabel(req.decoded,req.params,function(err, label) {
    if (err)
    return next(err);

    res.json({
      message: 'labels successfully deleted'
    });
  });
 };
