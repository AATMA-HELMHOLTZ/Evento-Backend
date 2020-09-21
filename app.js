var express                 = require("express");
var app                     = express();
var bodyParser              = require("body-parser");
var mongoose                = require("mongoose");
var User                    = require("./models/user");
var passport                = require("passport");
var passportLocalMongoose   = require("passport-local-mongoose");
var LocalStrategy           = require("passport-local");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "AATMA is GOAT", 
    resave: false, 
    saveUninitialized: false
}));


mongoose.connect('mongodb+srv://tejas12345:tejas12345@cluster0.cqxmw.gcp.mongodb.net/demo_auth_v1?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("connected to db"))
.catch(() => console.log(error.message));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//------------------ROUTES----------------

//APP ROUTES
app.get("/", function(req, res){
    res.json({"page": "home"});
});


//show signup from
app.get("/register", function(req, res){
    res.json({"message": "Enter deets"});
});

app.post("/register", function(req, res){
    // req.body.username
    // req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function (err, user){
        if (err) {
            console.log(err);
            res.json({"sucess": err});
        } else {
            console.log(user);
            passport.authenticate("local")(req, res, function(){
                res.json({"sucess": "registered"})
            });
        }
    })
});

//login routes

app.get("/login", function(req, res){
    res.json({"message": "Enter login details"});
});


app.post("/login", passport.authenticate("local",{
    successRedirect: "/", 
    failureRedirect: "/login"
}), function(req, res){  
});

app.get("/logout", function(req, res){
    req.logout();
    res.json({"message":"logged out"})
    res.redirect("/");
});


//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
         next();
    }
    res.redirect("/login");
}

//SERVER INITIALISE 
//============================================
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Started server");
});