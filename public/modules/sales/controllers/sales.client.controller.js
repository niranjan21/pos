'use strict';

// Sale controller
angular.module('sales').controller('SalesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sales',
	function($scope, $stateParams, $location, Authentication, Sales) {
		$scope.authentication = Authentication;

		// Create new Sale
		$scope.create = function() {
			// Create new Sale object
			var sale = new Sales ({
        
        cashOrCreditSales: this.cashOrCreditSales,
        
        partyName: this.partyName,
        
        salesBillNumber: this.salesBillNumber,
        
        saleDateAndTime: this.saleDateAndTime,
        
        totalAmount: this.totalAmount,
        
        totalDiscount: this.totalDiscount,
        
        taxes: this.taxes,
        
        paymentMethod: this.paymentMethod,
        
        cardTransactionId: this.cardTransactionId,
        
        cardTransactionTimeStamp: this.cardTransactionTimeStamp,
        
        cardTransactionBankAuthorizationId: this.cardTransactionBankAuthorizationId,
              
        created: Date.now
  
			});

			// Redirect after save
			sale.$save(function(response) {
				$location.path('sales/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Sale
		$scope.remove = function(sale) {
			if ( sale ) { 
				sale.$remove();

				for (var i in $scope.Sales) {
					if ($scope.sales [i] === sale) {
						$scope.sales.splice(i, 1);
					}
				}
			} else {
				$scope.sale.$remove(function() {
					$location.path('sales');
				});
			}
		};

		// Update existing Sale
		$scope.update = function() {
			var sale = $scope.sale;

			sale.$update(function() {
				$location.path('sales/' + sale._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Sale
		$scope.find = function() {
			$scope.sales = Sales.query();
		};

		// Find existing Sale
		$scope.findOne = function() {


      Sales.get({ 
				saleId: $stateParams.saleId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        data.saleDateAndTime = moment(data.saleDateAndTime).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        data.cardTransactionTimeStamp = moment(data.cardTransactionTimeStamp).format('YYYY-MM-DD');
        
        
        
        
        $scope.sale = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);