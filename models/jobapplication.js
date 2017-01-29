mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var JobApplicationSchema = new Schema({
    userid:{type: Schema.Types.String, ref: 'addUser'},
    jobid:String,
    applicationdata:Object,

});
JobApplicationSchema.plugin(autoIncrement.plugin,'JobApplicationSchema');
var addJobApplication=mongoose.model('addJobApplication',JobApplicationSchema);
exports.addjobapplication=function(req,res){

    addJobApplication.update({userid:req.body.applicationdata.userid,jobid:req.body.applicationdata.jobid},{
        userid:req.body.applicationdata.userid,
        jobid:req.body.applicationdata.jobid,
        applicationdata:req.body.applicationdata
    },{upsert:true},function(err,data){
        if(err)
        {
            res.send(err);
        }else{
            res.send(data);
        }
    })
}
exports.getappliedjobs=function(req,res){
    if(req.body.userid){
        addJobApplication.find({userid:req.body.userid},function (err,data) {
            if(err){
                res.send(err)
            }else {
                res.send(data)
            }
        })
    }
    else if(req.body.jobid) {
        addJobApplication.find({jobid:req.body.jobid},function (err,data) {
            if(err){
                res.send(err)
            }else {
                res.send(data)
            }
        })
    }

}