var express = require("express");
var Label = require("../model/labelModel");


/************************
   create label api here..
**********************/
 exports.createLabel = function(req, res) {
   console.log(req.body);
   var new_label = new Label();
   new_label.title = req.body.title;
   //new_note.email = req.body.email;
   //new_note.user_id =req.body.user_id;
   new_label.save(function(err, label) {
     if (err)
       res.send(err);
       console.log(label);
       res.json(label);
   });
 }

/****************************
 Read Labels here...
 *************************/
 exports.readLabel = function(req, res) {
    Label.find({
    // find by id and email
    //user_id:req.user.id

    }, function(err, label) {
      if (err)
      res.send(500, { err: 'something blew up' });
      //res.send(err);
      res.json(label);
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
 Label.findOneAndUpdate({
   _id: req.params.id,
 //  user_id:req.user.id
 }, req.body, {
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
