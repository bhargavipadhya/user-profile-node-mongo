var express = require('express');
var app = express();
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


app.listen(3000);