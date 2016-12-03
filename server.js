var https = require('https');
var fs = require('fs');

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
var config = require('./config/database');

var port = process.env.PORT || 8082;
var jwt = require('jwt-simple');
//modules load
var addUser=require("./models/user");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use("/", express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
require('./config/passport')(passport);
require('./config/passport1')(passport1);

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

app.get('/',function(req,res){
  res.sendfile(__dirname + '/public/html/index.html');
})
app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/html/indexangular.html');
});



console.log('started the server at localhost:'+port);

