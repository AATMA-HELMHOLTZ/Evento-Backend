const validationResult = require("express-validator").validationResult;
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const event = require('../models/event-type')
const service = require('../models/service')
const Vendor = require('../models/vendor')
const RequestError = require("../middlewares/request-error");


const getVendors = async (req,res,next,service)=>{
    let vendors;

    try{
        vendors = await Vendor.find({service:service})
    }catch(err){
        const error = new RequestError(err);
        res.json({error: error.message})
    }

    await res.json(
        {
            vendors: vendors
        }
    )
}

const getVendorsById = async  (req,res,next) => {
    const id=req.params._id;
    let vendor;
    try{
        vendor = await Vendor.findById(id)
    }catch(err){
        const error = new RequestError(err);
        res.json({error: error.message})
    }
    await res.json(
        {
            vendorDetails: vendor
        }
    )
}
exports.getVendors = getVendors;