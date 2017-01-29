var https = require('https');
var fs = require('fs');
var cors = require('cors');
var configAuth = require('./config/auth');
/*var options = {
 key: fs.readFileSync('VideoConferenceModule/fake-keys/key.pem'),
 cert: fs.readFileSync('VideoConferenceModule/fake-keys/cert.pem'),
 passphrase:'99121Padma'
 };*/
var nodemailer = require('nodemailer');
var multer  = require('multer');
var upload = multer({ dest: './public/images' });
var uploaddocument=multer({dest:'./public/documents'});
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
var request = require('request');
var port = process.env.PORT || 8081;
var jwt = require('jwt-simple');
//modules load
var addUser=require("./models/user");
var addCV1=require("./models/cvuser");
var addskills=require("./models/skills");
var addjobs=require("./models/jobs");
var addvideo=require("./models/videoresume");
var addcandidate=require("./models/candidate");
var addjobapplication=require("./models/jobapplication");
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
app.post('/postjob',addjobs.addnewjob);
app.post('/postvideo',addvideo.addnewvideo);
app.post('/userdata',addUser.getuserdata);
app.post('/getCV1',addCV1.getcv1details);
app.post('/cv1',addCV1.addcv1details);
app.post('/cvdetails',addCV1.addcv1details);
app.post('/searchskill',addskills.retrieveskills);
app.post('/addskills',addskills.addnewskills);
app.get('/allcvs',addCV1.getallcvs);
app.post('/selectcandidate',addcandidate.selectcandidate);
app.post('/getcandidates',addcandidate.getcandidates);
app.post('/removecandidates',addcandidate.removecandidate);
app.get('/getjobs',addjobs.findalljobs);
app.post('/getjob',addjobs.getjobdetails);
app.post('/applyjob',addjobapplication.addjobapplication);
app.post('/appliedjobs',addjobapplication.getappliedjobs);
// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
app.get('/auth/facebook', passport2.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport2.authenticate('facebook', {
    }),function (req,res) {
        var userCopy = JSON.parse(JSON.stringify(req.user));
        delete userCopy.auth;
        res.status(200).render('http:localhost:4200/    ', {user: userCopy});
    });

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        client_id        : configAuth.facebookAuth.clientID,
        client_secret    : configAuth.facebookAuth.clientSecret,
        redirect_uri     : configAuth.facebookAuth.callbackURL,

        code: req.body.code,

        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { proxy: 'http://proxy.iiit.ac.in:8080',json: true, form: params }, function(err, response, token) {
        if(err)
            res.send(err)
        else if(response){

        }
        console.log(response);
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };

        // Step 2. Retrieve profile information about the current user.
        request.get({proxy: 'http://proxy.iiit.ac.in:8080', url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
            console.log(profile)
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        return res.send({ token: createJWT(existingUser) });
                    }
                    var user = new User();
                    user.google = profile.sub;
                    user.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.displayName = profile.name;
                    user.save(function(err) {
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
});

app.post('/auth/facebook', function(req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var graphApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        client_id        : configAuth.facebookAuth.clientID,
        client_secret    : configAuth.facebookAuth.clientSecret,
        redirect_uri     : configAuth.facebookAuth.callbackURL,

        code: req.body.code,

    };

    // Step 1. Exchange authorization code for access token.
    request.get({proxy: 'http://proxy.iiit.ac.in:8080', url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        console.log(err)
        if(response) {
            if (response.statusCode !== 200) {
                return res.status(500).send({message: accessToken.error.message});
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
                if (response.statusCode !== 200) {
                    return res.status(500).send({message: profile.error.message});
                }
                if (req.header('Authorization')) {
                    console.log(response, profile);
                    /*User.findOne({ facebook: profile.id }, function(err, existingUser) {
                     if (existingUser) {
                     return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                     }
                     var token = req.header('Authorization').split(' ')[1];
                     var payload = jwt.decode(token, config.TOKEN_SECRET);
                     User.findById(payload.sub, function(err, user) {
                     if (!user) {
                     return res.status(400).send({ message: 'User not found' });
                     }
                     user.facebook = profile.id;
                     user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                     user.displayName = user.displayName || profile.name;
                     user.save(function() {
                     var token = createJWT(user);
                     res.send({ token: token });
                     });
                     });
                     });*/
                } else {
                    // Step 3. Create a new user account or return an existing one.
                    User.findOne({facebook: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            return res.send({token: token});
                        }
                        var user = new User();
                        user.facebook = profile.id;
                        user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.displayName = profile.name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({token: token});
                        });
                    });
                }
            });
        }
    });
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

