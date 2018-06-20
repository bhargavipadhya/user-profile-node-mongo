var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin',
        'http://localhost:4200');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods',
        'GET','POST','PUT','DELETE','OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_lbq17ggx:5r2tltpkvap1eo06934kg58ipr@ds163530.mlab.com:63530/heroku_lbq17ggx');

var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);

app.listen(process.env.PORT || 8080);