/******************************************************************************
*  Purpose         : Rest api of users here..
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
var User = require("../model/User");
var User1 = require("../model/User1");
//var tokenid = require("../model/uid");
var key="ghfdhdhweyeyrer";
var bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
var jwt = require('jsonwebtoken');
// var session = require('express-session');
 var mongoose = require('mongoose');
 var nodemailer = require('nodemailer');
 var async = require('async');
 var crypto = require('crypto');
 var flash = require('connect-flash');
 var smtpTransport = require("nodemailer-smtp-transport");
 const TokenGenerator = require('uuid-token-generator'); var ids = require('short-id');
 const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
 // tokgen.generate();
 //passport Strategy purpose
 var FacebookStrategy = require('passport-facebook').Strategy;
 var FacebookTokenStrategy = require('passport-facebook-token');
 var fbConfig = require('../config/auth');

 var  passport = require('passport');
 var multer  = require('multer');
 var userService = require("../service/user.service");
 var storage =multer.diskStorage({
 destination :function(req,file,callback)
 {
   callback( null,'./uploads');
 },
 filename:function(req,file,callback)
 {
  file.originalname = Date.now() +"_"+ file.originalname;
   callback(null,file.originalname);
 },
 });
 var upload = multer({storage : storage}).single('image');


/**
  * @description Class signUp use for registeration
  * @class signUp
  * @extends {req, res}
  */

exports.signUp = function(req, res) {

    userService.signUp(req.body,function(err, user) {
      if (err)
        res.json({
          success: false,
          message: 'user not register'
        })
      res.json({
        success: true,
        message: 'user successfully register'
      });
  });
};

/***
* @description Class signIn use for signIn user
* @class signIn
* @extends {req, res}
**/

exports.signIn = function(req, res) {

   userService.signIn(req.body, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.userpass)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: userService.generateJwt({ email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id})});
      }
    }
  });
};


/***
* @description Class signInWithFacebook use for login fb user
* @class signInWithFacebook
* @extends {req, res}
**/

exports.signInWithFacebook = function (req,res) {
  var user = req.user;
  if (user) {
      var token = userService.generateJwt({ email: user.email, fullName: user.username, mobile: user.usermobile,_id: user._id});
      res.setHeader('x-auth-token', token);
      res.json({ token : token });
  }else {
    res.json({ err : "No valid user" });
  }
}
/****************************
* @description Class readActiveUser use for read user
* @class readActiveUser
* @extends {req, res}
*****************************/

exports.readActiveUser = function(req, res) {

    userService.showProfile(req.decoded,function(err, note) {
     if (err)
     return next(err);
     //res.send(err);
     res.json(note);

   });
}



/*********************************************
* @description Class activeUser use for update user
* @class activeUser
* @extends {req, res}
 ******************************************/

exports.activeUser = function(req, res) {

  upload(req,res,function(err){
    var userObj = req.body || {};
    if(req.file && req.file.path){
      userObj.image = req.file.path;
    }
    User.findOneAndUpdate({
     _id : req.params.id
 },userObj , {
   new: true
 },
 function(err, note) {
     if (err)
      return next(err);
   res.json(note);
   });
 });
};


/*********************************
@description Class loginRequired use for  user
* @class activeUser
* @extends {req, res,next}
*********************************/
 exports.loginRequired = function(req, res, next) {

 if (req.user) {
    next();
   } else
  {
      return res.status(401).json({ message: 'Unauthorized user!' });
  }
 };


/*****************************************
@description Class forgot_password use for user
* @class forgot_password
* @extends {req, res}
*****************************************/
 exports.forgot_password = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({
        email: req.body.email
      }).exec(function(err, user) {
        if (user) {
          done(err, user);
        } else {

          done('User not found.');
        }
      });
    },
    function(user, done) {
      // create the random token
      var token = tokgen.generate();
      done(null, user, token);

    },
    function(user, token, done) {
      User.findByIdAndUpdate({
        _id: user._id
      }, {
        reset_password_token: token,
        reset_password_expires: Date.now() + 86400000
      }, {
        upsert: true,
        new: true
      }).exec(function(err, new_user) {
        done(err, token, new_user);
      });
    },
    function(token, user, done) {

      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'sidkadam63@gmail.com',
          pass: '8097784516'
        }
      });

      var data = {
        to: req.body.email,
        from: 'sidkadam63@gmail.com',
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + 'localhost:4200/forgetpass/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

        // url: 'http://localhost:3000/auth/reset_password?token=' + token,
        // name: user.username.split(' ')[0]
      }

      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({
            message: 'Kindly check your email for further instructions',
            link:  'http://' + req.headers.host + '/reset/' + token

          });
        } else {
          return done(err);
        }
      });
    }
  ], function(err) {
    return res.status(422).json({
      message: err
    });
  });
};

/*****************************************
@description Class reset_password use for user
* @class reset_password
* @extends {req, res,next}
*****************************************/

exports.reset_password = function(req, res, next) {

  User.findOne({
    reset_password_token: req.params.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.userpass = bcrypt.hashSync(req.body.newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var smtpTransport = nodemailer.createTransport( {
              service: 'Gmail',
              auth: {
                user: 'sidkadam63@gmail.com',
                pass: '8097784516'
              }
            })
            var data = {
              to: user.email,
              from: 'sidkadam63@gmail.com',
              template: 'reset-password-email',
              subject: 'Password Reset Confirmation',
              text: 'password reset'
            };

            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({ message: 'Password reset' });
              } else {
                return done(err);
              }
            });
          }
        });
      }
    else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      });
    }
  });
};


  /***
  * @description Class passport use for user
  * @class passport
  * @extends {passport}
  **/
exports.passport = function(passport) {
   // used to serialize the user for the session
   passport.serializeUser(function(user, done) {

       done(null, user.id);
   });

   // used to deserialize the user
  passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       });
   });



   //pull in our app id and secret from our auth.js file
  passport.use('facebook-token', new FacebookTokenStrategy(fbConfig.facebookAuth, function(accessToken, refreshToken, profile, done) {



     User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
          return done(err, user);
        });
}));
return passport;
}(passport);
