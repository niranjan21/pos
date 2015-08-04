'use strict';

// ProductCategory controller
angular.module('product-categories').controller('ProductCategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductCategories',
	function($scope, $stateParams, $location, Authentication, ProductCategories) {
		$scope.authentication = Authentication;

		// Create new ProductCategory
		$scope.create = function() {
			// Create new ProductCategory object
			var productcategory = new ProductCategories ({
        
        categoryName: this.categoryName,
        
        imageOfTheCategory: this.imageOfTheCategory,
              
        created: Date.now
  
			});

			// Redirect after save
			productcategory.$save(function(response) {
				$location.path('product-categories/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProductCategory
		$scope.remove = function(productcategory) {
			if ( productcategory ) { 
				productcategory.$remove();

				for (var i in $scope.ProductCategories) {
					if ($scope.productcategories [i] === productcategory) {
						$scope.productcategories.splice(i, 1);
					}
				}
			} else {
				$scope.productcategory.$remove(function() {
					$location.path('product-categories');
				});
			}
		};

		// Update existing ProductCategory
		$scope.update = function() {
			var productcategory = $scope.productcategory;

			productcategory.$update(function() {
				$location.path('product-categories/' + productcategory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProductCategory
		$scope.find = function() {
			$scope.productcategories = ProductCategories.query();
		};

		// Find existing ProductCategory
		$scope.findOne = function() {


      ProductCategories.get({ 
				productCategoryId: $stateParams.productCategoryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.productcategory = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);