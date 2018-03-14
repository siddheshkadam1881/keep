//var express = require("express");
//var User = require("../model/User");
//var apiRoutes =express.Router();
//token file..
//var jwt = require('jsonwebtoken');
 //exports.signin= function(req, res) {
//     try {
//             User.findOne({
//                 "email": req.body.email
//             }, function(err, user) {
//                 try {
//                     if (err) throw err;
//                     console.log("user::",user);
//                     if (!user) {
//                         res.send({
//                             status: false,
//                             description: 'logging failed'
//                         });
//                     } else {
//                         // console.log(user);
//                         var userObj = user.toJSON();
//                         // generate the token because we have the username and pasword matching
//                         console.log(userObj._id,config.secret);
//                         var token = jwt.sign({
//                             id: userObj._id
//                         }, config.secret, {
//                             expiresIn: 100*60
//                         });
//                         //send the response to the caller with the access token and data
//                         res.send({
//                             user_id: userObj._id,
//                             status: true,
//                             description: 'logging in Successfully',
//                             token: token
//                         });
//                     }
//                 } catch (e) {
//                   console.log(e);
//                     res.send({
//                         status: false,
//                         description: 'logging failed'
//                     });
//                 }
//             });
//         }
//      catch (e) {
//         res.send({
//             status: false,
//             description: 'logging failed'
//         });
//     }
// });

//module.exports = apiRoutes;
