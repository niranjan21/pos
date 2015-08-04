'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var salesItems = require('../../app/controllers/sales-items.server.controller');

	// Sales items Routes
	app.route('/sales-items')
		.get(salesItems.list)
		.post(users.requiresLogin, salesItems.create);

	app.route('/sales-items/:salesItemId')
		.get(salesItems.read)
		.put(users.requiresLogin, salesItems.hasAuthorization, salesItems.update)
		.delete(users.requiresLogin, salesItems.hasAuthorization, salesItems.delete);

	// Finish by binding the Sales item middleware
	app.param('salesItemId', salesItems.salesItemByID);
};
