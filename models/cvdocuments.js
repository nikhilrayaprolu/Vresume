mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var CVDocumentSchema = new Schema({
    username:String,
    file:String,
    filename:String
});
CVDocumentSchema.plugin(autoIncrement.plugin,'CVDocumentSchema');
var addCVdocument=mongoose.model('addCVdocument',CVDocumentSchema);

exports.addcv1details=function(req,res){
    console.log(req.body)
    addCV1.update({username:req.body.username},{
        username:req.body.username,
        Location:req.body.Location,
        FullName:req.body.FullName,
        MobileNumber:req.body.MobileNumber,
        WorkExperience:req.body.WorkExperience||null,
        ProfileDescription:req.body.ProfileDescription,
        Keyskills:req.body.Keyskills,
        Industry:req.body.Industry,
        FunctionalArea:req.body.FunctionalArea,
        EducationBackGround:req.body.EducationBackGround,
    },{upsert:true},function(err,data){
        if(err)
        {
            res.send(err);
        }else{
            res.send(data);
        }
    })
}
