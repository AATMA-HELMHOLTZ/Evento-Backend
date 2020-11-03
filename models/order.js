const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const OrderSchema = new mongoose.Schema({
    estimatedCost: {type:Number},
    // vendorSelected: [],
    dateOfOrder: {type: Date}


})

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Order", OrderSchema);