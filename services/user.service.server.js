module.exports = function(app) {
    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/logout', logout);
    app.post('/api/login', login);

    var userModel = require('../models/user/user.model.server');

    function findUserById(req, res){
        var userId = req.params['userId'];
        userModel.findUserById(userId)
            .then(function(user){
                res.json(user);
            })
    }

    function profile(req,res){
        res.send(req.session['currentUser']);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function login(req,res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function(user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user)
            .then(function(user){
                req.session['currentUser'] = user;
                res.send(user);
            })
    }
}
