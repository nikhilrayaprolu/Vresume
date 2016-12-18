var https = require('https');
var fs = require('fs');
var cors = require('cors');
/*var options = {
  key: fs.readFileSync('VideoConferenceModule/fake-keys/key.pem'),
  cert: fs.readFileSync('VideoConferenceModule/fake-keys/cert.pem'),
  passphrase:'99121Padma'
};*/


var nodemailer = require('nodemailer');
var multer  = require('multer');
var upload = multer({ dest: './public/images' });
var uploaddocument=multer({dest:'./public/documents'})

//all basic library loading
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var passport1 = require('passport');
var passport2=require('passport');
var config = require('./config/database');

var port = process.env.PORT || 8081;
var jwt = require('jwt-simple');
//modules load
var addUser=require("./models/user");
var addCV=require("./models/cvuser");
var addskills=require("./models/skills");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use("/", express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development

    'http://www.myproductionurl.com'
];
var corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
}

//here is the magic
app.use(cors(corsOptions));
require('./config/passport')(passport);
require('./config/passport1')(passport1);
require('./config/passport2')(passport2);
var server = require('http').Server(app).listen(port);
//server=https.createServer(options, app).listen(8082);


var apiRoutes =express.Router();

apiRoutes.post('/signup',addUser.userSignUp);
apiRoutes.post('/authenticate',addUser.authenticate);

app.use('/api',apiRoutes);
app.get('/auth/google',
  passport1.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport1.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.get('/profile', isLoggedIn, function(req, res) {
  res.send(req.user);
});
app.post('/uploadphotos',upload.array('file', 12),function(req,res){
  console.log(req.files);
  res.send(req.files);
});
app.post('/cvdetails',addCV.addcvdetails);
app.post('/searchskill',addskills.retrieveskills);
app.post('/addskills',addskills.addnewskills);
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport2.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
      passport2.authenticate('facebook', {
        successRedirect : '/signup',
        failureRedirect : '/'
      }));

    // route for logging out
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }


  app.get('/',function(req,res){
    res.sendfile(__dirname + '/public/html/index.html');
  })
  app.get('*', function (req, res) {
    res.sendfile(__dirname + '/public/html/indexangular.html');
  });



  console.log('started the server at localhost:'+port);

