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
        image: "http://10.0.2.2:5000/uploads/events/venue.jpg",
        servicesOffered: ["1","2","3","4","5"]
        }),
        new event({
            nameOfEvent: "Birthday Party",
            image: "http://10.0.2.2:5000/uploads/events/venue.jpg",
            servicesOffered: ["1","2","3","4","5"]

        }),
        new event({
            nameOfEvent: "Wedding",
            image: "http://10.0.2.2:5000/uploads/events/venue.jpg",
            servicesOffered: ["1","2","3","4","5"]

        }),
        new event({
            nameOfEvent: "TedX",
            image: "http://10.0.2.2:5000/uploads/events/venue.jpg",
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
const getEvents = async (req,res,next) =>{
    let events;
    try {
        events = await event.find();
    } catch (err) {
        const error = new RequestError('Fetching events failed, please try again later.', 500, err);
        return next(error);
    }
    await res.json(
        {

            "events": events.map(event => event.toObject({getters: true}))
        }
    );
}
const deleteAll = async (req,res,next) =>{
    let events;
    try{
        events = await event.deleteMany();
    }catch (err) {
        const error = new RequestError('Deleting events failed, please try again later.', 500, err);
        return next(error);
    }
    await res.json(
        {
            "status":"success"

        }
    );
}
exports.deleteAll = deleteAll;
exports.getEvents = getEvents;
exports.addRoot = addRoot;