const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const vendorSchema = new mongoose.Schema({
    name: {type: String} ,
    img: {type: String},
    email: {type: String},
    number: {type:Number},
    ratings: {type: Array},
    city: {type: String},
    service: {type:String},
    avgStar: {type:Number},
    description: {type: String}


})

vendorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Vendor", vendorSchema);