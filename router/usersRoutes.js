/**
* @author siddheshwar kadam
* @version 1.0
**/
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var router = require('express').Router();
var userController=require('../controller/userController.js');
var todoController=require('../controller/todoController.js');
var labelController=require('../controller/labelController.js');
var userService = require("../service/user.service");
var User = require("../model/User");
var FacebookTokenStrategy = require('passport-facebook-token');
const TokenGenerator = require('uuid-token-generator');
var ids = require('short-id');
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
 var token=tokgen.generate();
var passport = require('passport');
var passport = userController.passport;
var secretConfig = require('../config/config');
// console.log(secretConfig.secret);
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.post('/loginRequired',userController.loginRequired);
router.post('/forgot_password',userController.forgot_password);
router.post('/reset_password/:token',userController.reset_password);
router.put('/activeUser/:id',userController.activeUser);

/*
 *  Redirect the user to Facebook for authentication.  When complete,
 *   Facebook will redirect the user back to the application at
 *    /auth/facebook/callback
 *
 *  route for facebook authentication and login
 *   different scopes while logging in
*/

router.post('/auth/facebook',passport.authenticate('facebook-token', {session: false}),userController.signInWithFacebook);

  /*
  * token handling middleware
  */
  var authenticate = expressJwt({
    secret: secretConfig.secret,
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });


/*
*  middleware create here use to verify
*  user who have jwt token
*  or not..
*/

router.use(function(req, res, next) {
// check header or url parameters or post parameters for token
 var token = req.body.token || req.query.token || req.headers['token'];

  // console.log("heloo",token);
  if (token) {
    // verifies secret and checks exp
   userService.verifyJwt(token, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    /**   if there is no token
     ** return an error
      **/
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

/*
* note todoController
*/

 router.post('/create/Note',todoController.createNote);
 router.get('/readTodos',todoController.readTodos);
 // router.get('/readTodos/:id',todoController.readTodoById);
 router.put('/update/:id',todoController.update);
 router.delete('/delete/:id',todoController.delete);
 router.get('/readActiveUser',userController.readActiveUser);

/*
*label controller
*/
router.post('/createLabel',labelController.createLabel);
router.get('/readLabel',labelController.readLabel);
// // router.get('/readLabel/:id',labelController.readLabelById);
router.put('/updateLabel/:id',labelController.updateLabel);
// // // router.put('/uploader/:id',todoController.uploader);
router.delete('/deleteLabel/:id',labelController.deleteLabel);
router.post('/label/:id',labelController.label);
//






module.exports = router;
