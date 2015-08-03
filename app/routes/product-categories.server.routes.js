'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productCategories = require('../../app/controllers/product-categories.server.controller');

	// Product categories Routes
	app.route('/product-categories')
		.get(productCategories.list)
		.post(users.requiresLogin, productCategories.create);

	app.route('/product-categories/:productCategoryId')
		.get(productCategories.read)
		.put(users.requiresLogin, productCategories.hasAuthorization, productCategories.update)
		.delete(users.requiresLogin, productCategories.hasAuthorization, productCategories.delete);

	// Finish by binding the Product category middleware
	app.param('productCategoryId', productCategories.productCategoryByID);
};
