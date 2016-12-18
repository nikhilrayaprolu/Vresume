mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var SkillSchema = new Schema({
	skillname:String,
	Category:String
	
});

SkillSchema.plugin(autoIncrement.plugin,'SkillSchema');
var addskill=mongoose.model('addskill',SkillSchema);
exports.addnewskills=function(req,res){
	var skill = new addskill({
			skillname:req.body.skillname,
			Category:req.body.Category,
		});
	skill.save(function(err){
		if(err){
			res.send(err);
		}else{
			res.send("successfully added");
		}
	})
		
}
exports.retrieveskills=function(req,res){
	addskill.find({skillname:new RegExp('.*'+req.body.searchtag+'.*', "i")},function(err,data){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			res.send(data);
		}
	})
}
