'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Purchase = mongoose.model('Purchase'),
	_ = require('lodash');

/**
 * Create a Purchase
 */
exports.create = function(req, res) {
	var purchase = new Purchase(req.body);
	purchase.user = req.user;

	purchase.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchase);
		}
	});
};

/**
 * Show the current Purchase
 */
exports.read = function(req, res) {
	res.jsonp(req.purchase);
};

/**
 * Update a Purchase
 */
exports.update = function(req, res) {
	var purchase = req.purchase ;

	purchase = _.extend(purchase , req.body);

	purchase.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchase);
		}
	});
};

/**
 * Delete an Purchase
 */
exports.delete = function(req, res) {
	var purchase = req.purchase ;

	purchase.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchase);
		}
	});
};

/**
 * List of Purchases
 */
exports.list = function(req, res) { 
	Purchase.find().sort('-created').populate('user', 'displayName').exec(function(err, purchases) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchases);
		}
	});
};

/**
 * Purchase middleware
 */
exports.purchaseByID = function(req, res, next, id) { 
	Purchase.findById(id).populate('user', 'displayName').exec(function(err, purchase) {
		if (err) return next(err);
		if (! purchase) return next(new Error('Failed to load Purchase ' + id));
		req.purchase = purchase ;
		next();
	});
};

/**
 * Purchase authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.purchase.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
