'use strict';

//Setting up route
angular.module('purchase-items').config(['$stateProvider',
	function($stateProvider) {
		// Purchase items state routing
		$stateProvider.
		state('listPurchaseItems', {
			url: '/purchase-items',
			templateUrl: 'modules/purchase-items/views/list-purchase-items.client.view.html'
		}).
		state('createPurchaseItem', {
			url: '/purchase-items/create',
			templateUrl: 'modules/purchase-items/views/create-purchase-item.client.view.html'
		}).
		state('viewPurchaseItem', {
			url: '/purchase-items/:purchaseItemId',
			templateUrl: 'modules/purchase-items/views/view-purchase-item.client.view.html'
		}).
		state('editPurchaseItem', {
			url: '/purchase-items/:purchaseItemId/edit',
			templateUrl: 'modules/purchase-items/views/edit-purchase-item.client.view.html'
		});
	}
]);