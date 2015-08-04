'use strict';

//Sales items service used to communicate Sales items REST endpoints
angular.module('sales-items').factory('SalesItems', ['$resource',
	function($resource) {
		return $resource('sales-items/:salesItemId', { salesItemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);