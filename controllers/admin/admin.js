var express = require('express');
const { admin } = require('../../models/adminmodel');
var adminmodel      = require.main.require('./models/adminmodel');
var router = express.Router();

router.get('*', function (request, response, next) {

    if (request.session.username != null && request.session.usertypes=="admin") {
        next();
    } else {
        response.redirect('/logout');
    }

});

//Admin homepage
router.get('/', function(req, res){

    var sessionid = req.session.userid
    adminmodel.admin(sessionid,function(user){
        res.render('admin/adminhome',{user:user});
})     
});

//view All Users
router.get('/users', function(req, res){

    var sessionid = req.session.userid

    adminmodel.ViewUsers( function(result){
        adminmodel.admin(sessionid,function(user){
            res.render('admin/adminusers',{result:result,user:user});
        })
    })

});

//Admin profile page
router.get('/:username', function(req, res){

    var sessionid = req.session.userid
    adminmodel.admin(sessionid,function(user){
        res.render('admin/viewprofile',{user:user});
})     
});

module.exports=router;
