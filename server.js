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
mongoose.connect('mongodb://localhost/course-manager-MEAN');

var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/message/:theMessage', function (req, res) {
    let theMessage = req.params['theMessage'];
    res.send(theMessage)
});

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

function setSession(req,res){
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req,res){
    var name = req.params['name'];
    res.send(req.session[name]);
}

var userService = require('./services/user.service.server');
userService(app);

app.listen(3000);