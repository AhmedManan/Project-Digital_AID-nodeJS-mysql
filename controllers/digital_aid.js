var express = require('express');
var digital_aid      = require.main.require('./models/digital_aid');
var router = express.Router();
router.get('/', function(request, response, next){

		response.render('index')

});

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    digital_aid.getCredentials(username,password,function(result){
        if(result.length>0){
            if(result[0].password==password){
                var remember = req.body.remember;
                if(remember=="true"){
                    req.session.username=result[0].username;// creates session as loginemail
                    req.session.usertypes=result[0].usertype;// creates session as loginemail
                    req.session.userid=result[0].id;// creates session as loginemail
                    
                }
                else{
                console.log('rem false')
                   req.session.username=result[0].username;// creates session as loginemail
                   req.session.usertypes=result[0].usertype;// creates session as usertype
                   req.session.userid=result[0].id;// creates session as loginemail
                   console.log(req.session.username)

                }
                console.log(" after else")
               //usertype check
               
    if( req.session.usertypes != null){
        
        if(req.session.usertypes=="consumer")
        {
            // var username=req.cookies['username'];
            // var userid=req.cookies['userid'];
            // var data= {
            //     userdata: [username,userid],
            // }
            res.redirect('/consumer');
        }
		else if (req.session.usertypes=="admin")
		{
            res.redirect('/admin');
        }
        
	}else{
		res.redirect('/');
	}


               // res.json({ status: 'valid' });
            } 
            else{
                res.json({ status: 'invalid' });
            }
        }
        else{
            res.json({ status: 'invalid' });
        }
    })
    
});



module.exports = router;





