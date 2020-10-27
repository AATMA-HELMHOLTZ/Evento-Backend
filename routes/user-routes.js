const express = require('express');
const router = new express.Router();
const {check} = require('express-validator');
// const User = require("../models/user");

// const passport = require("passport");
// // const LocalStrategy = require("passport-local");

const userController = require("../controllers/user-controllers");


//    /api/v1/user/signup

router.post('/signup'
    , [
    check('email')

        .isEmail(),
    check('password').isLength({min: 6}),
]
    , userController.signUp
);


router.post('/login',)






module.exports = router;