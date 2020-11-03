const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const serviceSchema = new mongoose.Schema({
    serviceName: {type: String, required:true},
    listOfVendors: [{type: mongoose.Types.ObjectId, ref: 'Vendor'}],
    icon: {type: String}


})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Service", serviceSchema);