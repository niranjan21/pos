'use strict';

//Product categories service used to communicate Product categories REST endpoints
angular.module('product-categories').factory('ProductCategories', ['$resource',
	function($resource) {
		return $resource('product-categories/:productCategoryId', { productCategoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);