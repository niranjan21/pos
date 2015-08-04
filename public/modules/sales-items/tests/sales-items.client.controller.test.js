'use strict';

(function() {
	// Sales items Controller Spec
	describe('Sales items Controller Tests', function() {
		// Initialize global variables
		var SalesItemsController,
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

			// Initialize the Sales items controller.
			SalesItemsController = $controller('SalesItemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sales item object fetched from XHR', inject(function(SalesItems) {
			// Create sample Sales item using the Sales items service
			var sampleSalesItem = new SalesItems({
				name: 'New Sales item'
			});

			// Create a sample Sales items array that includes the new Sales item
			var sampleSalesItems = [sampleSalesItem];

			// Set GET response
			$httpBackend.expectGET('sales-items').respond(sampleSalesItems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salesItems).toEqualData(sampleSalesItems);
		}));

		it('$scope.findOne() should create an array with one Sales item object fetched from XHR using a salesItemId URL parameter', inject(function(SalesItems) {
			// Define a sample Sales item object
			var sampleSalesItem = new SalesItems({
				name: 'New Sales item'
			});

			// Set the URL parameter
			$stateParams.salesItemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sales-items\/([0-9a-fA-F]{24})$/).respond(sampleSalesItem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.salesItem).toEqualData(sampleSalesItem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(SalesItems) {
			// Create a sample Sales item object
			var sampleSalesItemPostData = new SalesItems({
				name: 'New Sales item'
			});

			// Create a sample Sales item response
			var sampleSalesItemResponse = new SalesItems({
				_id: '525cf20451979dea2c000001',
				name: 'New Sales item'
			});

			// Fixture mock form input values
			scope.name = 'New Sales item';

			// Set POST response
			$httpBackend.expectPOST('sales-items', sampleSalesItemPostData).respond(sampleSalesItemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sales item was created
			expect($location.path()).toBe('/sales-items/' + sampleSalesItemResponse._id);
		}));

		it('$scope.update() should update a valid Sales item', inject(function(SalesItems) {
			// Define a sample Sales item put data
			var sampleSalesItemPutData = new SalesItems({
				_id: '525cf20451979dea2c000001',
				name: 'New Sales item'
			});

			// Mock Sales item in scope
			scope.salesItem = sampleSalesItemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/sales-items\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sales-items/' + sampleSalesItemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid salesItemId and remove the Sales item from the scope', inject(function(SalesItems) {
			// Create new Sales item object
			var sampleSalesItem = new SalesItems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sales items array and include the Sales item
			scope.salesItems = [sampleSalesItem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sales-items\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSalesItem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.salesItems.length).toBe(0);
		}));
	});
}());