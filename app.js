const express = require('express');
const path = require('path');
const session = require('express-session');
const digital_aid = require('./controllers/digital_aid');
const admin = require('./controllers/admin/admin');
const app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));

// serve the static files. css, js, img etc
app.use(express.static('public/digital_aid'));
app.use(express.static('public/user_panel'));



// Template engine. ejs
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
app.use(session({
    secret:'Digital_Aid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));


//routes/middleware
app.use('/', digital_aid);
app.use('/admin', admin);

//error: 404 page not found
app.use((req, res, next) => {
    var err = new Error('page not found');
    err.status = 404;
    next(err);
})

//handling error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message)
});

//setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;