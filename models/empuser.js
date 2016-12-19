mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');

var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var EmpSchema = new Schema({
	userid:{type: Schema.Types.String, ref: 'addUser'},
	Location:String,
	Industry:String,
	Designation:String,
	CompanyNumber:Number,

	
});

EmpSchema.plugin(autoIncrement.plugin,'EmpSchema');
var addEmp=mongoose.model('addEmp',EmpSchema);
exports.addempdetails=function(req,res){
	
	addEmp.update({userid:req.body.userid},{
		userid:req.body.userid,
		Location:req.body.Location,
		Industry:req.body.Industry,
		Designation:req.body.Designation,
		CompanyNumber:req.body.CompanyNumber,
	
	},{upsert:true},function(err,data){
		if(err)
		{
			res.send(err);
		}else{
			res.send(data);
		}
	})
}