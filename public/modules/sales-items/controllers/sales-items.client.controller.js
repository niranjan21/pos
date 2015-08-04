'use strict';

// SalesItem controller
angular.module('sales-items').controller('SalesItemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'SalesItems',
	function($scope, $stateParams, $location, Authentication, SalesItems) {
		$scope.authentication = Authentication;

		// Create new SalesItem
		$scope.create = function() {
			// Create new SalesItem object
			var salesitem = new SalesItems ({
        
        productName: this.productName,
        
        lotOrBatchNumber: this.lotOrBatchNumber,
        
        quantity: this.quantity,
        
        unitOfMeasure: this.unitOfMeasure,
        
        amount: this.amount,
        
        discount: this.discount,
              
        created: Date.now
  
			});

			// Redirect after save
			salesitem.$save(function(response) {
				$location.path('sales-items/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing SalesItem
		$scope.remove = function(salesitem) {
			if ( salesitem ) { 
				salesitem.$remove();

				for (var i in $scope.SalesItems) {
					if ($scope.salesitems [i] === salesitem) {
						$scope.salesitems.splice(i, 1);
					}
				}
			} else {
				$scope.salesitem.$remove(function() {
					$location.path('sales-items');
				});
			}
		};

		// Update existing SalesItem
		$scope.update = function() {
			var salesitem = $scope.salesitem;

			salesitem.$update(function() {
				$location.path('sales-items/' + salesitem._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of SalesItem
		$scope.find = function() {
			$scope.salesitems = SalesItems.query();
		};

		// Find existing SalesItem
		$scope.findOne = function() {


      SalesItems.get({ 
				salesItemId: $stateParams.salesItemId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.salesitem = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);