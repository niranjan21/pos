'use strict';

(function() {
	// Purchase items Controller Spec
	describe('Purchase items Controller Tests', function() {
		// Initialize global variables
		var PurchaseItemsController,
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

			// Initialize the Purchase items controller.
			PurchaseItemsController = $controller('PurchaseItemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Purchase item object fetched from XHR', inject(function(PurchaseItems) {
			// Create sample Purchase item using the Purchase items service
			var samplePurchaseItem = new PurchaseItems({
				name: 'New Purchase item'
			});

			// Create a sample Purchase items array that includes the new Purchase item
			var samplePurchaseItems = [samplePurchaseItem];

			// Set GET response
			$httpBackend.expectGET('purchase-items').respond(samplePurchaseItems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchaseItems).toEqualData(samplePurchaseItems);
		}));

		it('$scope.findOne() should create an array with one Purchase item object fetched from XHR using a purchaseItemId URL parameter', inject(function(PurchaseItems) {
			// Define a sample Purchase item object
			var samplePurchaseItem = new PurchaseItems({
				name: 'New Purchase item'
			});

			// Set the URL parameter
			$stateParams.purchaseItemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/purchase-items\/([0-9a-fA-F]{24})$/).respond(samplePurchaseItem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchaseItem).toEqualData(samplePurchaseItem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PurchaseItems) {
			// Create a sample Purchase item object
			var samplePurchaseItemPostData = new PurchaseItems({
				name: 'New Purchase item'
			});

			// Create a sample Purchase item response
			var samplePurchaseItemResponse = new PurchaseItems({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchase item'
			});

			// Fixture mock form input values
			scope.name = 'New Purchase item';

			// Set POST response
			$httpBackend.expectPOST('purchase-items', samplePurchaseItemPostData).respond(samplePurchaseItemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Purchase item was created
			expect($location.path()).toBe('/purchase-items/' + samplePurchaseItemResponse._id);
		}));

		it('$scope.update() should update a valid Purchase item', inject(function(PurchaseItems) {
			// Define a sample Purchase item put data
			var samplePurchaseItemPutData = new PurchaseItems({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchase item'
			});

			// Mock Purchase item in scope
			scope.purchaseItem = samplePurchaseItemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/purchase-items\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/purchase-items/' + samplePurchaseItemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid purchaseItemId and remove the Purchase item from the scope', inject(function(PurchaseItems) {
			// Create new Purchase item object
			var samplePurchaseItem = new PurchaseItems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Purchase items array and include the Purchase item
			scope.purchaseItems = [samplePurchaseItem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/purchase-items\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePurchaseItem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.purchaseItems.length).toBe(0);
		}));
	});
}());