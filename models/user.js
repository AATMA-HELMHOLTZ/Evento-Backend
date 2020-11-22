const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
    name: {type: String, default:'User'},
    username: {type: String,
        // required: true,
        // unique: true,
        // match: /\S+@\S+\.\S+/
    },
    password: {type: String,required:false, minlength: 6},
    appPassword: {type: String,required:false, minlength: 6},
    mobile: {type: Number, required:false, minlength:10 },
    city: {type: String, default:'Delhi'},
    orders: {type: Array, default:[]},
    img: {type: String, default: "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"}
    // prevOreder: [{ref: order}]
    //
    // name: {type: String, default:'User'},
    // username: {type: String}, // Email
    // password: {type: String},
    // mobile: {type: Number, required:false, minlength:10, maxlength:10 },
    // city: {type: String, default:'Delhi'},
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    // img: {type: String, default: "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png%22%7D

})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);