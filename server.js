var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
//var userRoutes=require('./router/usersRoutes.js');
var cors = require('cors');
var expressJwt = require('express-jwt');
 var  passport = require('passport');
var cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [{secret: 'session secret key' }],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
//passport Strategy
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var userRoutes=require('./router/usersRoutes.js');
//-------Route -------------------- folder location along with namer
app.use("/uploads" , express.static("uploads"));
app.use(cors());
app.use(userRoutes);
var mongoose = require('mongoose');
var config = require("./config");
mongoose.connect('mongodb://localhost/Todo');


app.listen(3000,function()
{
console.log("we are listening at port 3000");
})
