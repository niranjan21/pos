'use strict';

(function() {
	// Product categories Controller Spec
	describe('Product categories Controller Tests', function() {
		// Initialize global variables
		var ProductCategoriesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Product categories controller.
			ProductCategoriesController = $controller('ProductCategoriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Product category object fetched from XHR', inject(function(ProductCategories) {
			// Create sample Product category using the Product categories service
			var sampleProductCategory = new ProductCategories({
				name: 'New Product category'
			});

			// Create a sample Product categories array that includes the new Product category
			var sampleProductCategories = [sampleProductCategory];

			// Set GET response
			$httpBackend.expectGET('product-categories').respond(sampleProductCategories);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productCategories).toEqualData(sampleProductCategories);
		}));

		it('$scope.findOne() should create an array with one Product category object fetched from XHR using a productCategoryId URL parameter', inject(function(ProductCategories) {
			// Define a sample Product category object
			var sampleProductCategory = new ProductCategories({
				name: 'New Product category'
			});

			// Set the URL parameter
			$stateParams.productCategoryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/product-categories\/([0-9a-fA-F]{24})$/).respond(sampleProductCategory);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productCategory).toEqualData(sampleProductCategory);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductCategories) {
			// Create a sample Product category object
			var sampleProductCategoryPostData = new ProductCategories({
				name: 'New Product category'
			});

			// Create a sample Product category response
			var sampleProductCategoryResponse = new ProductCategories({
				_id: '525cf20451979dea2c000001',
				name: 'New Product category'
			});

			// Fixture mock form input values
			scope.name = 'New Product category';

			// Set POST response
			$httpBackend.expectPOST('product-categories', sampleProductCategoryPostData).respond(sampleProductCategoryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Product category was created
			expect($location.path()).toBe('/product-categories/' + sampleProductCategoryResponse._id);
		}));

		it('$scope.update() should update a valid Product category', inject(function(ProductCategories) {
			// Define a sample Product category put data
			var sampleProductCategoryPutData = new ProductCategories({
				_id: '525cf20451979dea2c000001',
				name: 'New Product category'
			});

			// Mock Product category in scope
			scope.productCategory = sampleProductCategoryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/product-categories\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/product-categories/' + sampleProductCategoryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productCategoryId and remove the Product category from the scope', inject(function(ProductCategories) {
			// Create new Product category object
			var sampleProductCategory = new ProductCategories({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Product categories array and include the Product category
			scope.productCategories = [sampleProductCategory];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/product-categories\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductCategory);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productCategories.length).toBe(0);
		}));
	});
}());