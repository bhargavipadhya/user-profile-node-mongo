module.exports = function(app) {
    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put("/api/profile",updateProfile)

    // app.get("/api/user",findAllUsers)
    // app.post("/api/register",createUser)
    // app.get("/api/profile",profile)
    // app.post("/api/login",login)
    // app.get("/api/user/:username",findUserByUsername)
    // app.put("/api/profile",updateProfile)
    // app.post("/api/logout",logout)
    // app.delete("/api/profile",deleteProfile)

    var userModel = require('../models/user/user.model.server');

    function findUserById(req, res){
        var userId = req.params['userId'];
        userModel.findUserById(userId)
            .then(function(user){
                res.json(user);
            })
    }

    function updateProfile(req, res){
        var user = req.body;
        return userModel.updateUser(user)
            .then(function (updatedUser) {
                return res.send(updatedUser);
            })
    }


    function profile(req,res){
        res.send(req.session['currentUser']);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    // function login(req,res){
    //     var credentials = req.body;
    //     userModel.findUserByCredentials(credentials)
    //         .then(function(user) {
    //             req.session['currentUser'] = user;
    //             res.json(user);
    //         })
    // }


    function login(req, res){
        var credentials = req.body;
        return userModel.findUserByCredentials(credentials)
            .then(function (user) {
                if(user==null)
                {
                    return res.send({
                        username: 'NOT FOUND'
                    })
                }
                else{
                    req.session['currentUser'] = user;
                    var halfhour = 1800000
                    req.session.cookie.maxAge = halfhour
                    return res.send(user);
                }
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
