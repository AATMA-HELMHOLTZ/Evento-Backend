const validationResult = require("express-validator").validationResult;
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const event = require('../models/event-type')
const RequestError = require("../middlewares/request-error");

const addEvent = (req,res,next) => {
    // const errors = validationResult(req);
    const { nameOfEvent} = req.body;
}

exports.addEvent = addEvent;