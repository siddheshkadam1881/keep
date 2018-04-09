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
  *
  * @class signUp
  * @extends {req, res}
  */


exports.signUp = function(req, res) {
  var user = new User(req.body);
  user.userpass = bcrypt.hashSync(req.body.userpass, 10);
  user.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.userpass = undefined;
      return res.json(user);
    }
  });
};

/***
* @description Class signIn use for signIn user
* @class signIn
* @extends {req, res}
**/

exports.signIn= function(req, res) {
  User.findOne({
    email: req.body.email
   }, function(err, user) {
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

/****************************
* @description Class readActiveUser use for read user
* @class readActiveUser
* @extends {req, res}
*****************************/

exports.readActiveUser = function(req, res) {

   User.find({
        email:req.decoded.email
   }, function(err, note) {
     if (err)
     res.send(500, { err: 'something blew up' });
     //res.send(err);
     res.json(note);
     console.log(note);
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
     res.send(err);
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
   console.log(req.body);
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
          console.log(req.body.email)
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
  console.log(req.params.token);
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


 /**
  *  facebook login
  **/
exports.passport = function(passport) {
   // used to serialize the user for the session
   passport.serializeUser(function(user, done) {
     // console.log(user);
       done(null, user.id);
   });

   // used to deserialize the user
  passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       });
   });


//
   //pull in our app id and secret from our auth.js file
  passport.use('facebook-token', new FacebookTokenStrategy(fbConfig.facebookAuth, function(accessToken, refreshToken, profile, done) {

      // console.log(accessToken, refreshToken, profile);

     User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
          return done(err, user);
        });
}));
return passport;
}(passport);




//
//  /**
//   *  facebook login
//   **/
// exports.passport = function(passport) {
//    // used to serialize the user for the session
//    passport.serializeUser(function(user, done) {
//      console.log(user);
//        done(null, user.id);
//    });
//
//    // used to deserialize the user
//   passport.deserializeUser(function(id, done) {
//        User.findById(id, function(err, user) {
//            done(err, user);
//        });
//    });
//
//  console.log(fbConfig.facebookAuth);
//
//    //pull in our app id and secret from our auth.js file
// //   passport.use( new FacebookStrategy(fbConfig.facebookAuth, function(accessToken, refreshToken, profile, done) {
// //     console.log("test",accessToken, refreshToken, profile);
// //      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
// //           return done(err, user);
// //         });
// // }));
//   passport.use("facebook",new FacebookStrategy(
//     fbConfig.facebookAuth,
//   // {  clientID: FACEBOOK_APP_ID,
//   //   clientSecret: FACEBOOK_APP_SECRET,
//   //   callbackURL: "http://localhost:3000/auth/facebook/callback"
//   // },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log("accesstoken", accessToken, refreshToken, profile)
//     // User.upsertFbUser({ facebookId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//   }
//   ));
// return passport;
// }(passport);
//
















 // exports.passport = function(passport) {
 //    // used to serialize the user for the session
 //    passport.serializeUser(function(user, done) {
 //        console.log("user..", user);
 //        done(null, user.id);
 //    });
 //
 //    // used to deserialize the user
 //    passport.deserializeUser(function(id, done) {
 //        console.log("id..", id);
 //        User.findById(id, function(err, user) {
 //            done(err, user);
 //        });
 //    });

    // pull in our app id and secret from our auth.js file
//     passport.use('google',new GoogleStrategy(googleConfig.googleAuth, function(access_token, tokenSecret, profile, done) {
//         // asynchronous
//         process.nextTick(function() {
//             console.log(profile);
//             // find the user in the database based on their google id
//             User.findOne({
//                 'google.id': profile.id
//             }, function(err, user) {
//                 console.log("google profile:", profile.photos);
//
//                 console.log(typeof profile.photos);
//                 // if there is an error, stop everything and return that
//                 // ie an error connecting to the database
//                 if (err)
//                     return done(err);
//                 // if the user is found, then log them in
//                 if (user) {
//                     return done(null, user); // user found, return that user
//                 } else {
//                     // if there is no user found with that google id, create them
//                     var newUser = new User();
//                     // set all of the google information in our user model
//                     newUser.google.id = profile.id; // set the users google id
//                     newUser.google.access_token = access_token; // we will save the token that google provides to the user
//                     newUser.google.firstName = profile.displayName;
//                     newUser.google.email = profile.emails[0].value; // google can return multiple emails so we'll take the first
//                     newUser.google.profile = JSON.stringify(profile.photos);
//                     newUser.google.gender = profile.gender;
//                     // newUser.google.profile = profile.picture;
//                     // save our user to the database
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//                         // if successful, return the new user
//                         return done(null, newUser);
//                     });
//                 }
//
//             });
//         });
//
//     }));
//     return passport;
// };(passport);
