// lib imports
const express = require("express");
const User = require("./models/user");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");

//routes import
const userRoutes = require('./routes/user-routes');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "AATMA is GOAT",
    resave: false,
    saveUninitialized: false
}));


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to db"))
    .catch(() => console.log(error.message));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//------------------ROUTES----------------

app.use('/api/v1/user',userRoutes);

//==============SERVER INITIALISE============

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Started server");
});