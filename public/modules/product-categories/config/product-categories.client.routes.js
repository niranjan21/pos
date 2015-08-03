'use strict';

//Setting up route
angular.module('product-categories').config(['$stateProvider',
	function($stateProvider) {
		// Product categories state routing
		$stateProvider.
		state('listProductCategories', {
			url: '/product-categories',
			templateUrl: 'modules/product-categories/views/list-product-categories.client.view.html'
		}).
		state('createProductCategory', {
			url: '/product-categories/create',
			templateUrl: 'modules/product-categories/views/create-product-category.client.view.html'
		}).
		state('viewProductCategory', {
			url: '/product-categories/:productCategoryId',
			templateUrl: 'modules/product-categories/views/view-product-category.client.view.html'
		}).
		state('editProductCategory', {
			url: '/product-categories/:productCategoryId/edit',
			templateUrl: 'modules/product-categories/views/edit-product-category.client.view.html'
		});
	}
]);