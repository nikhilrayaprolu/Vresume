mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var JobSchema = new Schema({
    jobTitle:String,
jobDescription:String,
industry:String,
noOfResp:Number,
resp:Array,
vac:Number,
timing:String,
salary:String,
perks:String,
noOfSkills:Number,
skill:Array,
noOfEducations:Number,
degree:Array,

});

JobSchema.plugin(autoIncrement.plugin,'JobSchema');
var addjob=mongoose.model('addjob',JobSchema);
exports.addnewjob=function(req,res){
    var job = new addjob({
        jobTitle:req.body.jobTitle,
        jobDescription:req.body.jobDescription,
        industry:req.body.industry,
        noOfResp:req.body.noOfResp,
        resp:req.body.resp,
        vac:req.body.vac,
        timing:req.body.timing,
        salary:req.body.salary,
        perks:req.body.perks,
        noOfSkills:req.body.noOfSkills,
        skill:req.body.skill,
        noOfEducations:req.body.noOfEducations,
        degree:req.body.degree,

    });
    job.save(function(err){
        if(err){
            console.log(err)
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    })

}
exports.findalljobs=function (req,res) {
    addjob.find({},function (err,data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(data)
        }

    })
}
exports.getjobdetails=function (req,res) {
    addjob.findOne({_id:req.body.jobid},function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
}
