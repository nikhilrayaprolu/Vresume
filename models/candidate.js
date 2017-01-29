mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var CandidateSchema = new Schema({
    username:{type: Schema.Types.String, ref: 'addUser'},
    jobid:{type:Number}

});

CandidateSchema.plugin(autoIncrement.plugin,'CandidateSchema');
var addCandidate=mongoose.model('addCandidate',CandidateSchema);
exports.selectcandidate=function(req,res){
    var candidate = new addCandidate({
        username:req.body.username,
        jobid:req.body.jobid
    });
    candidate.save(function(err){
        if(err){
            console.log(err)
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    })
}
exports.getcandidates=function(req,res){
    addCandidate.find({jobid:req.body.jobid},function (err,data) {
        if(err){
            res.send(err);
        }else {
            res.send(data);
        }
    })
}
exports.removecandidate=function(req,res){
    addCandidate.find({username:req.body.userid,jobid:req.body.jobid}).remove(function(err) {
        if(err)
            res.send(err);
        else{
            res.send("success");
    }
    })
}
