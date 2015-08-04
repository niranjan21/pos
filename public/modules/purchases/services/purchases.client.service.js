'use strict';

//Purchases service used to communicate Purchases REST endpoints
angular.module('purchases').factory('Purchases', ['$resource',
	function($resource) {
		return $resource('purchases/:purchaseId', { purchaseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);