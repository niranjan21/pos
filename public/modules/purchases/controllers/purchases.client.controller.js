'use strict';

// Purchase controller
angular.module('purchases').controller('PurchasesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Purchases',
	function($scope, $stateParams, $location, Authentication, Purchases) {
		$scope.authentication = Authentication;

		// Create new Purchase
		$scope.create = function() {
			// Create new Purchase object
			var purchase = new Purchases ({
        
        purchaseBillNumber: this.purchaseBillNumber,
        
        purchaseBillDate: this.purchaseBillDate,
        
        partyName: this.partyName,
        
        paidOrUnPaid: this.paidOrUnPaid,
              
        created: Date.now
  
			});

			// Redirect after save
			purchase.$save(function(response) {
				$location.path('purchases/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Purchase
		$scope.remove = function(purchase) {
			if ( purchase ) { 
				purchase.$remove();

				for (var i in $scope.Purchases) {
					if ($scope.purchases [i] === purchase) {
						$scope.purchases.splice(i, 1);
					}
				}
			} else {
				$scope.purchase.$remove(function() {
					$location.path('purchases');
				});
			}
		};

		// Update existing Purchase
		$scope.update = function() {
			var purchase = $scope.purchase;

			purchase.$update(function() {
				$location.path('purchases/' + purchase._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Purchase
		$scope.find = function() {
			$scope.purchases = Purchases.query();
		};

		// Find existing Purchase
		$scope.findOne = function() {


      Purchases.get({ 
				purchaseId: $stateParams.purchaseId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.purchaseBillDate = moment(data.purchaseBillDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.purchase = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);