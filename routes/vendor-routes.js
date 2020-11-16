const express = require('express');
const router = new express.Router();
const {check} = require('express-validator');
const fileUpload = require('../middlewares/image-upload')

const requestError = require('../middlewares/request-error')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const Vendor = require('../models/vendor');
const vendorController = require('../controllers/vendor-controller');



const checkAuth = require('../middlewares/check-auth');


router.get('/get/photographers',checkAuth,
    (req,res,next)=> {
    vendorController.getVendors(req,res,next,'photographer')
});

router.get('/get/caterer',checkAuth,
    (req,res,next)=> {
    vendorController.getVendors(req,res,next,'caterer')
});

router.get('/get/florist',checkAuth,
    (req,res,next)=> {
    vendorController.getVendors(req,res,next,'florist')
});

router.get('/get/decorator',checkAuth,
    (req,res,next)=> {
    vendorController.getVendors(req,res,next,'decorator')
});

router.get('/get/bakery',checkAuth,
    (req,res,next)=> {
    vendorController.getVendors(req,res,next,'bakery')
});

router.get('/get/vendorById/:vendorId',checkAuth,vendorController.getVendors)
// router.get('/get/caterer',checkAuth)



module.exports = router;