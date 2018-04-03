/**
* @author siddheshwar kadam
* @version 1.0
**/

var express = require("express");
var app = express();
var http = require('http').Server(app);
var validate = require('express-validation');
const Joi = require('joi');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
 var  passport = require('passport');
 var logger=require('./config/logger');
 var userRoutes=require('./router/usersRoutes.js');
 var port = process.env.PORT || 3000;
// var cookieSession = require('cookie-session');
// const multer = require('multer');
// app.use(cookieSession({
//   name: 'session',
//   keys: [{secret: 'session secret key' }],
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
//passport Strategy
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var userRoutes=require('./router/usersRoutes.js');
app.use("/uploads" , express.static("uploads"));
app.use(cors());
app.use(userRoutes);
var mongoose = require('mongoose');
var config = require("./config");
mongoose.connect('mongodb://localhost/Todo');
 // logger.info('aslvcksdvmsdvmdsmvzdmvdvsdmvsdvdsvhellojnsdvdvdv');
 // http.listen(port);
app.listen(port,function()
{
console.log("we are listening at port "+port);
})
