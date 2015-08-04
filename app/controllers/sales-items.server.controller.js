'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	SalesItem = mongoose.model('SalesItem'),
	_ = require('lodash');

/**
 * Create a Sales item
 */
exports.create = function(req, res) {
	var salesItem = new SalesItem(req.body);
	salesItem.user = req.user;

	salesItem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesItem);
		}
	});
};

/**
 * Show the current Sales item
 */
exports.read = function(req, res) {
	res.jsonp(req.salesItem);
};

/**
 * Update a Sales item
 */
exports.update = function(req, res) {
	var salesItem = req.salesItem ;

	salesItem = _.extend(salesItem , req.body);

	salesItem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesItem);
		}
	});
};

/**
 * Delete an Sales item
 */
exports.delete = function(req, res) {
	var salesItem = req.salesItem ;

	salesItem.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesItem);
		}
	});
};

/**
 * List of Sales items
 */
exports.list = function(req, res) { 
	SalesItem.find().sort('-created').populate('user', 'displayName').exec(function(err, salesItems) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesItems);
		}
	});
};

/**
 * Sales item middleware
 */
exports.salesItemByID = function(req, res, next, id) { 
	SalesItem.findById(id).populate('user', 'displayName').exec(function(err, salesItem) {
		if (err) return next(err);
		if (! salesItem) return next(new Error('Failed to load Sales item ' + id));
		req.salesItem = salesItem ;
		next();
	});
};

/**
 * Sales item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.salesItem.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
