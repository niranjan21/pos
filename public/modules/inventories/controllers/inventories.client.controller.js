'use strict';

// Inventory controller
angular.module('inventories').controller('InventoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventories',
	function($scope, $stateParams, $location, Authentication, Inventories) {
		$scope.authentication = Authentication;

		// Create new Inventory
		$scope.create = function() {
			// Create new Inventory object
			var inventory = new Inventories ({
        
        productName: this.productName,
        
        lotOrBatchNumber: this.lotOrBatchNumber,
        
        expiryDate: this.expiryDate,
        
        quantity: this.quantity,
        
        purchasePrice: this.purchasePrice,
              
        created: Date.now
  
			});

			// Redirect after save
			inventory.$save(function(response) {
				$location.path('inventories/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Inventory
		$scope.remove = function(inventory) {
			if ( inventory ) { 
				inventory.$remove();

				for (var i in $scope.Inventories) {
					if ($scope.inventories [i] === inventory) {
						$scope.inventories.splice(i, 1);
					}
				}
			} else {
				$scope.inventory.$remove(function() {
					$location.path('inventories');
				});
			}
		};

		// Update existing Inventory
		$scope.update = function() {
			var inventory = $scope.inventory;

			inventory.$update(function() {
				$location.path('inventories/' + inventory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Inventory
		$scope.find = function() {
			$scope.inventories = Inventories.query();
		};

		// Find existing Inventory
		$scope.findOne = function() {


      Inventories.get({ 
				inventoryId: $stateParams.inventoryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.expiryDate = moment(data.expiryDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.inventory = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);