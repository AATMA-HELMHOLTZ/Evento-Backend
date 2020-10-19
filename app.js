// External lib imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// inbuilt lib imports
const fs = require('fs');
const path = require('path');

// const User = require("./models/user");

//routes import
const userRoutes = require('./routes/user-routes');



// Custom Libraries
const RequestError = require('./models/request-error');



// -------------SERVER INITIALISE-----------------
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


//------------------SETUP ROUTES----------------

app.use('/api/v1/user',userRoutes);

//   UNSUPPORTED ROUTES
app.use((req, res, next) => {
    throw new RequestError('Could not find this route.', 404);
});

// -----------ERROR HANDLING--------------
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});


//==============SERVER INITIALISE AND CONNECTION TO DB============
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.SV_PORT, function () {
        console.log("Started server on",process.env.SV_PORT);
        console.log("connected to db")
    })
})
    .catch(() => console.log(error.message,"error while connecting to db"));


