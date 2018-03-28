/****************************
@author siddheshwar kadam
@version 1.0
*****************************/

var express = require("express");
var Label = require("../model/labelModel");
var labelService = require("../service/label.service");
var User = require("../model/User");


/************************
   create label api here..
**********************/
 exports.createLabel = function(req, res) {

   labelService.createUserlabel(req.body,req.decoded,function(err, user) {
     if (err)
     res.json({success:false,
       message: 'label cannot create'
     })
       res.json({success:true,
         message: 'label successfully create'
       });
   });

 }

/****************************
 Read user Labels here...
 *************************/
 exports.readLabel = function(req, res) {

   labelService.readUserlabel(req.decoded,function(err, note) {
      if (err)
      res.send(500, { err:'something blew up' });
      //res.send(err);
      res.json(note);
    });
 }

/********************************
 read particular Labels here...
 *****************************/
 exports.label= function(req, res) {
     //console.log(req)
      Label.findOne({
       _id : req.params.id
  }, function(err, label) {
        if (err)
        res.send(err);
        res.json(label);
     });
  };


/*********************************
   update labels here...
 *******************************/
exports.updateLabel = function(req, res) {
  console.log(req.decoded);
 Label.findOneAndUpdate({
   _id: req.params.id,
  user_id:req.decoded._id
  },req.body, {
   new: true
 }, function(err, label) {
   if (err)
     res.send(err);
     res.json(label);
 });
};

/******************************************
 delete function to delete a current labels
 ***************************************/
 exports.deleteLabel = function(req, res) {
  Label.remove({
    _id: req.params.id,
  }, function(err, label) {
    if (err)
      res.send(err);
    res.json({
      message: 'labels successfully deleted'
    });
  });
 };
