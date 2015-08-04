'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var purchaseItems = require('../../app/controllers/purchase-items.server.controller');

	// Purchase items Routes
	app.route('/purchase-items')
		.get(purchaseItems.list)
		.post(users.requiresLogin, purchaseItems.create);

	app.route('/purchase-items/:purchaseItemId')
		.get(purchaseItems.read)
		.put(users.requiresLogin, purchaseItems.hasAuthorization, purchaseItems.update)
		.delete(users.requiresLogin, purchaseItems.hasAuthorization, purchaseItems.delete);

	// Finish by binding the Purchase item middleware
	app.param('purchaseItemId', purchaseItems.purchaseItemByID);
};
