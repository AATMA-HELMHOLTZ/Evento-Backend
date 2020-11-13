const validationResult = require("express-validator").validationResult;
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const event = require('../models/event-type')
const service = require('../models/service')
const vendor = require('../models/vendor')
const RequestError = require("../middlewares/request-error");

const addRoot = async (req,res,next) => {

    const eventTypes = [


        new event({
        nameOfEvent: "Anniversary",
        image: "http://localhost:5000/uploads/events/Anniversary",
        servicesOffered: ["1","2","3","4","5"]
        }),
        new event({
            nameOfEvent: "Birthday Party",
            image: "http://localhost:5000/uploads/events/Anniversary",
            servicesOffered: ["1","2","3","4","5"]

        }),
        new event({
            nameOfEvent: "Wedding",
            image: "http://localhost:5000/uploads/events/Anniversary",
            servicesOffered: ["1","2","3","4","5"]

        }),
        new event({
            nameOfEvent: "TedX",
            image: "http://localhost:5000/uploads/events/Anniversary",
            servicesOffered: ["1","2","3","4","5"]

        })];
    try{

        for(let i=0; i<eventTypes.length;i++)
        {
            await eventTypes[i].save();
        }
        res.json({Chalgaya:"chal gaya"})
    }catch (err){
        console.log(err)
        res.json({error:"nahi chala"})
    }


    const vendorImages = [];

}

exports.addRoot = addRoot;