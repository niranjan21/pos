'use strict';

// Supplier controller
angular.module('suppliers').controller('SuppliersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Suppliers',
	function($scope, $stateParams, $location, Authentication, Suppliers) {
		$scope.authentication = Authentication;

		// Create new Supplier
		$scope.create = function() {
			// Create new Supplier object
			var supplier = new Suppliers ({
        
        name: this.name,
        
        mobileNumber: this.mobileNumber,
        
        address: this.address,
        
        email: this.email,
        
        pan: this.pan,
        
        tin: this.tin,
              
        created: Date.now
  
			});

			// Redirect after save
			supplier.$save(function(response) {
				$location.path('suppliers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Supplier
		$scope.remove = function(supplier) {
			if ( supplier ) { 
				supplier.$remove();

				for (var i in $scope.Suppliers) {
					if ($scope.suppliers [i] === supplier) {
						$scope.suppliers.splice(i, 1);
					}
				}
			} else {
				$scope.supplier.$remove(function() {
					$location.path('suppliers');
				});
			}
		};

		// Update existing Supplier
		$scope.update = function() {
			var supplier = $scope.supplier;

			supplier.$update(function() {
				$location.path('suppliers/' + supplier._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Supplier
		$scope.find = function() {
			$scope.suppliers = Suppliers.query();
		};

		// Find existing Supplier
		$scope.findOne = function() {


      Suppliers.get({ 
				supplierId: $stateParams.supplierId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.supplier = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);