const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const EventSchema = new mongoose.Schema({
    nameOfEvent: {type: String,required: true},
    image: {type: String,},
    servicesOffered: [],



})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", EventSchema);