var mysql = require('mysql');
var db = require('./dbconnection');
var express = require('express');

module.exports = {


admin: function(_sessionid,callback){
    var sql= "SELECT * FROM login_cred NATURAL JOIN user_info WHERE login_cred.id AND user_info.id LIKE '"+_sessionid+"'"
    db.getResults(sql,function(user){
        if(user.length>0){
            callback(user)
        }
        else{
            callback([])
        }
    })
},

// view all Users
ViewUsers: function(callback){
    var sql="select * from login_cred";
    db.getResults(sql,function(result){
        if(result.length>0){
            callback(result)
        }
        else{
            callback([])
        }
    })
}

}