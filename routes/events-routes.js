const express = require('express');
const router = new express.Router();
const {check} = require('express-validator');
const checkAuth = require('../middlewares/check-auth');

const eventController = require('../controllers/event-controller')
const userController = require("../controllers/user-controllers");

router.get('/get/addRoot',eventController.addRoot);
router.get('/get/getEvents',eventController.getEvents);

router.delete('/delete/deleteAll',eventController.deleteAll);

module.exports = router;