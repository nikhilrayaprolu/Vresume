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
