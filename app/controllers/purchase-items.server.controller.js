'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PurchaseItem = mongoose.model('PurchaseItem'),
	_ = require('lodash');

/**
 * Create a Purchase item
 */
exports.create = function(req, res) {
	var purchaseItem = new PurchaseItem(req.body);
	purchaseItem.user = req.user;

	purchaseItem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaseItem);
		}
	});
};

/**
 * Show the current Purchase item
 */
exports.read = function(req, res) {
	res.jsonp(req.purchaseItem);
};

/**
 * Update a Purchase item
 */
exports.update = function(req, res) {
	var purchaseItem = req.purchaseItem ;

	purchaseItem = _.extend(purchaseItem , req.body);

	purchaseItem.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaseItem);
		}
	});
};

/**
 * Delete an Purchase item
 */
exports.delete = function(req, res) {
	var purchaseItem = req.purchaseItem ;

	purchaseItem.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaseItem);
		}
	});
};

/**
 * List of Purchase items
 */
exports.list = function(req, res) { 
	PurchaseItem.find().sort('-created').populate('user', 'displayName').exec(function(err, purchaseItems) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaseItems);
		}
	});
};

/**
 * Purchase item middleware
 */
exports.purchaseItemByID = function(req, res, next, id) { 
	PurchaseItem.findById(id).populate('user', 'displayName').exec(function(err, purchaseItem) {
		if (err) return next(err);
		if (! purchaseItem) return next(new Error('Failed to load Purchase item ' + id));
		req.purchaseItem = purchaseItem ;
		next();
	});
};

/**
 * Purchase item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.purchaseItem.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
