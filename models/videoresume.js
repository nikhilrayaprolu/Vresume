mongoose=require('mongoose');
var passport = require('passport');
var config = require('./../config/database');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var bcrypt= require('bcrypt');
var VideoSchema = new Schema({
    username:String,
    videoid:String,
});

VideoSchema.plugin(autoIncrement.plugin,'VideoSchema');
var addvideo=mongoose.model('addvideo',VideoSchema);
exports.addnewvideo=function(req,res){
    var video = new addvideo({
        username:req.body.username,
        videoid:req.body.videoid
    });
    video.save(function(err){
        if(err){
            console.log(err)
            res.send({success:false});
        }else{
            res.send({success:true});
        }
    })

}
exports.finduservideo=function(req,res){
    addvideo.find({username:req.body.username},function (err,data) {
        if(err)
            res.send(err)
        else
            res.send(data)

    })
}