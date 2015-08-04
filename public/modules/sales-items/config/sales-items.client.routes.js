'use strict';

//Setting up route
angular.module('sales-items').config(['$stateProvider',
	function($stateProvider) {
		// Sales items state routing
		$stateProvider.
		state('listSalesItems', {
			url: '/sales-items',
			templateUrl: 'modules/sales-items/views/list-sales-items.client.view.html'
		}).
		state('createSalesItem', {
			url: '/sales-items/create',
			templateUrl: 'modules/sales-items/views/create-sales-item.client.view.html'
		}).
		state('viewSalesItem', {
			url: '/sales-items/:salesItemId',
			templateUrl: 'modules/sales-items/views/view-sales-item.client.view.html'
		}).
		state('editSalesItem', {
			url: '/sales-items/:salesItemId/edit',
			templateUrl: 'modules/sales-items/views/edit-sales-item.client.view.html'
		});
	}
]);