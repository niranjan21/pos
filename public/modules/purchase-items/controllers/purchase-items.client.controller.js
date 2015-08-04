'use strict';

// PurchaseItem controller
angular.module('purchase-items').controller('PurchaseItemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PurchaseItems',
	function($scope, $stateParams, $location, Authentication, PurchaseItems) {
		$scope.authentication = Authentication;

		// Create new PurchaseItem
		$scope.create = function() {
			// Create new PurchaseItem object
			var purchaseitem = new PurchaseItems ({
        
        productName: this.productName,
        
        lotOrBatchNumber: this.lotOrBatchNumber,
        
        expiryDate: this.expiryDate,
        
        quantity: this.quantity,
        
        purchasePrice: this.purchasePrice,
              
        created: Date.now
  
			});

			// Redirect after save
			purchaseitem.$save(function(response) {
				$location.path('purchase-items/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PurchaseItem
		$scope.remove = function(purchaseitem) {
			if ( purchaseitem ) { 
				purchaseitem.$remove();

				for (var i in $scope.PurchaseItems) {
					if ($scope.purchaseitems [i] === purchaseitem) {
						$scope.purchaseitems.splice(i, 1);
					}
				}
			} else {
				$scope.purchaseitem.$remove(function() {
					$location.path('purchase-items');
				});
			}
		};

		// Update existing PurchaseItem
		$scope.update = function() {
			var purchaseitem = $scope.purchaseitem;

			purchaseitem.$update(function() {
				$location.path('purchase-items/' + purchaseitem._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PurchaseItem
		$scope.find = function() {
			$scope.purchaseitems = PurchaseItems.query();
		};

		// Find existing PurchaseItem
		$scope.findOne = function() {


      PurchaseItems.get({ 
				purchaseItemId: $stateParams.purchaseItemId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.expiryDate = moment(data.expiryDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.purchaseitem = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);