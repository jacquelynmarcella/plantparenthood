require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/IsLoggedIn');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Profile route
router.get('/profile', isLoggedIn, function(req, res){	
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.plant, db.journal]
	}).then(function(user){
		res.render('users/profile', {user: user});	
	});
});

// User's plant collection
router.get('/plants', isLoggedIn, function(req, res){	
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.plant]
	}).then(function(user){
		res.render('users/plants', {user: user});	
	});
});

// For updating the last watered date on profile
router.post('/lastwatered', isLoggedIn, function(req, res) {
	var lastWatered = req.body.lastWatered;
	db.user.findOne({
		where: {id: req.body.id}
	}).then(function(user){
		user.lastWatered = lastWatered;
		user.save();
	}).then(function(dateUpdated){
		res.redirect('/users/profile');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	});
});


module.exports = router;