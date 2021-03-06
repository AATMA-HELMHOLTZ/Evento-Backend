const validationResult = require("express-validator").validationResult;
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const event = require('../models/event-type')
const service = require('../models/service')
const Vendor = require('../models/vendor')
const RequestError = require("../middlewares/request-error");
const User = require('../models/user');
const nodemailer = require("nodemailer");
const moment = require("moment")



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
    const id=req.params.vendorId;
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

const sendMail = async (req,res,next) => {
    const userId = req.userData.userId;
    const vendorId = req.params.vendorId;
    console.log(vendorId);
    let user;
    let vendor
    try{
        user = await User.findById(userId)
        vendor = await Vendor.findById(vendorId)
    }catch(err){
        const error = new RequestError(err,500)
        res.json({
            error: error
        })
    }

    const arr = user["orders"]
    arr.push({"vendor":vendor, "date": moment().format("MMMM Do YYYY, h:mm a")})
    // console.log(user)
    user.save()
    let smtpTransport = await nodemailer.createTransport({
        service: "FastMail",
        auth: {
            user: process.env.EVENTO_EMAIL,
            pass: process.env.EMAIL_PW
        }
    });
    let mailOptions = {
        to: vendor.email,
        from: process.env.EVENTO_EMAIL,
        subject: 'Evento Event Enquiry',
        text: 'You are receiving this because ' + user.name + ' has requested for a callback from the website.\n\n' +
            'Please find the details of the user below:\n\n' +
            'Name: '+ user.name + '\nEmail: ' + user.username + '\nMobile Number: ' + user.mobile +
            '\nThank you for using Evento.',
    };
    await smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        res.json({mailSent:"yoss"})
    });

}

const myCart = async (req,res,next) =>{
    let userId = req.userData.userId;
    let user;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new RequestError(err,404)
        res.json({error: error.message});
    }

    // let Arr = [...user.orders];
    // console.log(Arr)

    await res.json({
        vendorsInCart: user.orders
    })
    // console.log(Arr.length)
}

exports.getVendorsById = getVendorsById;
exports.myCart = myCart;
exports.sendMail = sendMail;
exports.getVendors = getVendors;