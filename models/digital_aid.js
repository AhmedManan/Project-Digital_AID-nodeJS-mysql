var db      = require('./dbconnection');

module.exports = {
    getCredentials: function(username,password,callback){
        var sql="SELECT `id`, `username`, `email`, `password`, `usertype` FROM `login_cred` WHERE username ='"+username+"' OR email='"+username+"' and password='"+password+"'";
        db.getResults(sql,function(result){
            callback(result);
        });
    }   
}