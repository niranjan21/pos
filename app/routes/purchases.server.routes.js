'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var purchases = require('../../app/controllers/purchases.server.controller');

	// Purchases Routes
	app.route('/purchases')
		.get(purchases.list)
		.post(users.requiresLogin, purchases.create);

	app.route('/purchases/:purchaseId')
		.get(purchases.read)
		.put(users.requiresLogin, purchases.hasAuthorization, purchases.update)
		.delete(users.requiresLogin, purchases.hasAuthorization, purchases.delete);

	// Finish by binding the Purchase middleware
	app.param('purchaseId', purchases.purchaseByID);
};
