const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
    name: {type: String, default:'User'},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    mobile: {type: Number, required:false, minlength:10 },
    city: {type: String, default:'Delhi'}
})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);