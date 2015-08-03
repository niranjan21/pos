'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductCategory = mongoose.model('ProductCategory'),
	_ = require('lodash');

/**
 * Create a Product category
 */
exports.create = function(req, res) {
	var productCategory = new ProductCategory(req.body);
	productCategory.user = req.user;

	productCategory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productCategory);
		}
	});
};

/**
 * Show the current Product category
 */
exports.read = function(req, res) {
	res.jsonp(req.productCategory);
};

/**
 * Update a Product category
 */
exports.update = function(req, res) {
	var productCategory = req.productCategory ;

	productCategory = _.extend(productCategory , req.body);

	productCategory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productCategory);
		}
	});
};

/**
 * Delete an Product category
 */
exports.delete = function(req, res) {
	var productCategory = req.productCategory ;

	productCategory.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productCategory);
		}
	});
};

/**
 * List of Product categories
 */
exports.list = function(req, res) { 
	ProductCategory.find().sort('-created').populate('user', 'displayName').exec(function(err, productCategories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productCategories);
		}
	});
};

/**
 * Product category middleware
 */
exports.productCategoryByID = function(req, res, next, id) { 
	ProductCategory.findById(id).populate('user', 'displayName').exec(function(err, productCategory) {
		if (err) return next(err);
		if (! productCategory) return next(new Error('Failed to load Product category ' + id));
		req.productCategory = productCategory ;
		next();
	});
};

/**
 * Product category authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productCategory.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
