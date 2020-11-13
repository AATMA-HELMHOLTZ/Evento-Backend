const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const EventSchema = new mongoose.Schema({
    nameOfEvent: {type: String,required: true},
    image: {type: String,},
    servicesOffered: [{type: String}]

})

EventSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Event", EventSchema);