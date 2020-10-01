const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const registerUser = async (req, res, next) => {
    // req.body.username
    // req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.json({"sucess": err});
        } else {
            console.log(user);
            passport.authenticate("local")(req, res, function () {
                res.json({"sucess": "registered"})
            });
        }
    })
}

const logoutUser = async (req, res) => {
    req.logout();
    res.json({"message": "logged out"})
    // res.redirect("/");
}

exports.registerUser = registerUser;
exports.logoutUser = logoutUser;