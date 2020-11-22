const express = require('express');
const router = new express.Router();
const {check} = require('express-validator');
const fileUpload = require('../middlewares/image-upload')

const multer = require('multer')
const upload = multer({dest: 'uploads/'})



const checkAuth = require('../middlewares/check-auth');
// const User = require("../models/user");

// const passport = require("passport");
// // const LocalStrategy = require("passport-local");

const userController = require("../controllers/user-controllers");


router.get('/get/all', userController.getUsers);

router.get('/get',checkAuth, userController.getUserById);


router.patch('/patch/editProfile',checkAuth,upload.single('image'), userController.editUser);
router.delete('/delete/deleteUser',userController.deleteAll)
//    /api/v1/user/signup
router.post('/signup'
    , [
    check('username')

        .isEmail(),
    check('appPassword').isLength({min: 6}),
]
    , userController.signUp
);


router.post('/login', [
    check('username')
        .not()
        .isEmpty(),
    check('password').isLength({min: 6}),

], userController.login);

// router.post('/forgotPassword', [
//     check('username').not().isEmpty()
// ], userController.forgotPassword);






module.exports = router;