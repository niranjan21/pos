'use strict';

//Setting up route
angular.module('purchases').config(['$stateProvider',
	function($stateProvider) {
		// Purchases state routing
		$stateProvider.
		state('listPurchases', {
			url: '/purchases',
			templateUrl: 'modules/purchases/views/list-purchases.client.view.html'
		}).
		state('createPurchase', {
			url: '/purchases/create',
			templateUrl: 'modules/purchases/views/create-purchase.client.view.html'
		}).
		state('viewPurchase', {
			url: '/purchases/:purchaseId',
			templateUrl: 'modules/purchases/views/view-purchase.client.view.html'
		}).
		state('editPurchase', {
			url: '/purchases/:purchaseId/edit',
			templateUrl: 'modules/purchases/views/edit-purchase.client.view.html'
		});
	}
]);