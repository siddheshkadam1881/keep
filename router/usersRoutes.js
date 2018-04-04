/****************************
@author siddheshwar kadam
@version 1.0
*****************************/

var jwt = require('jsonwebtoken');
var router = require('express').Router();
var userController=require('../controller/userController.js');
var todoController=require('../controller/todoController.js');
var labelController=require('../controller/labelController.js');
var userService = require("../service/user.service");
var User1 = require("../model/User1");
// const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
const TokenGenerator = require('uuid-token-generator'); var ids = require('short-id');
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
 var token=tokgen.generate();
 console.log(token)
//var passport = require('passport');
var passport = userController.passport;
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.post('/loginRequired',userController.loginRequired);
router.post('/forgot_password',userController.forgot_password);
router.post('/reset_password/:token',userController.reset_password);
router.get('/readActiveUser',userController.readActiveUser);
router.put('/activeUser/:id',userController.activeUser);
/*
 *  Redirect the user to Facebook for authentication.  When complete,
 *   Facebook will redirect the user back to the application at
 *    /auth/facebook/callback
 *
 *  route for facebook authentication and login
 *   different scopes while logging in
*/
	router.get('/auth/facebook',
	 passport.authenticate('facebook', { scope : 'email' }
	));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.

	// router.get('/auth/facebook/callback',
	//   passport.authenticate('facebook', {
	// 		successRedirect : '/dummy/'+token,
	// 		failureRedirect : '/signin'
	// 	})
	// );

  router.get('/auth/facebook/callback',facebookSignInCallback);
   function facebookSignInCallback(req, res, next) {
    passport = req._passport.instance;
    passport.authenticate('facebook',function(err, user, info) {
			console.log("in indes file :users::",user);
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('signin');
        }
            // successRedirect : '/dummy/'+user.fb.access_token
            res.writeHead(302, {
                 'Location': '/#!/authProvider?token=' + user.fb.access_token + '&id='+user._id+ '&fb_id='+user.fb.id+ '&email='+user.fb.email+ '&photo='+user.fb.profile+ '&provider='+'fb'
            });
            res.end();
       });
    })(req,res,next);
}



/*******************************
  middleware create here...
*******************************/

router.use(function(req, res, next) {
// check header or url parameters or post parameters for token
 var token = req.body.token || req.query.token || req.headers['token'];
   console.log(token);
  // decode token
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


 router.post('/create/Note',todoController.createNote);
 router.get('/readTodos',todoController.readTodos);
 // router.get('/readTodos/:id',todoController.readTodoById);
 router.put('/update/:id',todoController.update);
 router.delete('/delete/:id',todoController.delete);
//
// ///////label controller
router.post('/createLabel',labelController.createLabel);
router.get('/readLabel',labelController.readLabel);
// // router.get('/readLabel/:id',labelController.readLabelById);
router.put('/updateLabel/:id',labelController.updateLabel);
// // // router.put('/uploader/:id',todoController.uploader);
router.delete('/deleteLabel/:id',labelController.deleteLabel);
router.post('/label/:id',labelController.label);
//
































































































/*
 *  Redirect the user to Facebook for authentication.  When complete,
 *   Facebook will redirect the user back to the application at
 *    /auth/facebook/callback
 *
 *  route for facebook authentication and login
 *   different scopes while logging in
*/
	router.get('/auth/facebook',
	 passport.authenticate('facebook', { scope : 'email' }
	));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		})
	);

  // router.get('/auth/google',
	//  passport.authenticate('google', { scope : 'email' }
	// ));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.

	// router.get('/auth/google/callback',
	//   passport.authenticate('google', {
	// 		successRedirect : '/',
	// 		failureRedirect : '/'
	// 	})
	// );










module.exports = router;
