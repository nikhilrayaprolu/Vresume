mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');

var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var CVSchema = new Schema({
	userid:{type: Schema.Types.ObjectId, ref: 'addUser'},
	Location:String,
	WorkExperience:Number,
	ProfileDescription:String,
	Keyskills:String,
	Industry:String,
	FunctionalArea:String,
	EducationBackGround:Array,

	
});

CVSchema.plugin(autoIncrement.plugin,'CVSchema');
var addCV=mongoose.model('addCV',CVSchema);
exports.addcvdetails=function(req,res){
	
	addCV.update({userid:req.body.userid},{
		userid:req.body.userid,
		Location:req.body.Location,
	WorkExperience:req.body.WorkExperience,
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