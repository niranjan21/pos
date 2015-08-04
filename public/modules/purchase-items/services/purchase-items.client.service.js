'use strict';

//Purchase items service used to communicate Purchase items REST endpoints
angular.module('purchase-items').factory('PurchaseItems', ['$resource',
	function($resource) {
		return $resource('purchase-items/:purchaseItemId', { purchaseItemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);