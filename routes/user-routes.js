const express = require('express');
const router = new express.Router();
const passport = require("passport");
// const LocalStrategy = require("passport-local");

const userControllers = require("../controllers/user-controllers");

router.post("/register", userControllers.registerUser);

// here controller was not defined
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), () =>{});

router.get("/logout", userControllers.logoutUser);

module.exports = router;