var router = require('express').Router();
var userController=require('../controller/userController.js');
var todoController=require('../controller/todoController.js');
var labelController=require('../controller/labelController.js');


//var passport = require('passport');


var passport = userController.passport;
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.post('/loginRequired',userController.loginRequired);
router.post('/forgot_password',userController.forgot_password);
router.post('/reset_password/:token',userController.reset_password);
router.get('/readActiveUser',userController.readActiveUser);
router.put('/activeUser/:id',userController.activeUser);

///////todo controller
router.post('/create',todoController.createNote);
router.get('/readTodos',todoController.readTodos);
router.get('/readTodos/:id',todoController.readTodoById);
router.put('/update/:id',todoController.update);
// router.put('/uploader/:id',todoController.uploader);
router.delete('/delete/:id',todoController.delete);

///////label controller
router.post('/createLabel',labelController.createLabel);
router.get('/readLabel',labelController.readLabel);
// router.get('/readLabel/:id',labelController.readLabelById);
router.put('/updateLabel/:id',labelController.updateLabel);
// // router.put('/uploader/:id',todoController.uploader);
router.delete('/deleteLabel/:id',labelController.deleteLabel);
router.post('/label/:id',labelController.label);





























































































//router.get()
//router.post('/set',userController.reset);



// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

	// route for facebook authentication and login
	// different scopes while logging in

	// router.get('/auth/facebook',
	//  passport.authenticate('facebook', { scope : 'email' }
	// ));
  //
  // // Facebook will redirect the user to this URL after approval.  Finish the
  // // authentication process by attempting to obtain an access token.  If
  // // access was granted, the user will be logged in.  Otherwise,
  // // authentication has failed.
  //
	// router.get('/auth/facebook/callback',
	//   passport.authenticate('facebook', {
	// 		successRedirect : '/',
	// 		failureRedirect : '/'
	// 	})
	// );

  // router.get('/auth/google',
	//  passport.authenticate('google', { scope : 'email' }
	// ));
  //
  // // Facebook will redirect the user to this URL after approval.  Finish the
  // // authentication process by attempting to obtain an access token.  If
  // // access was granted, the user will be logged in.  Otherwise,
  // // authentication has failed.
  //
	// router.get('/auth/google/callback',
	//   passport.authenticate('google', {
	// 		successRedirect : '/',
	// 		failureRedirect : '/'
	// 	})
	// );










module.exports = router;
