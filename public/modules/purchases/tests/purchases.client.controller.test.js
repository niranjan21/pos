'use strict';

(function() {
	// Purchases Controller Spec
	describe('Purchases Controller Tests', function() {
		// Initialize global variables
		var PurchasesController,
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

			// Initialize the Purchases controller.
			PurchasesController = $controller('PurchasesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Purchase object fetched from XHR', inject(function(Purchases) {
			// Create sample Purchase using the Purchases service
			var samplePurchase = new Purchases({
				name: 'New Purchase'
			});

			// Create a sample Purchases array that includes the new Purchase
			var samplePurchases = [samplePurchase];

			// Set GET response
			$httpBackend.expectGET('purchases').respond(samplePurchases);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchases).toEqualData(samplePurchases);
		}));

		it('$scope.findOne() should create an array with one Purchase object fetched from XHR using a purchaseId URL parameter', inject(function(Purchases) {
			// Define a sample Purchase object
			var samplePurchase = new Purchases({
				name: 'New Purchase'
			});

			// Set the URL parameter
			$stateParams.purchaseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/purchases\/([0-9a-fA-F]{24})$/).respond(samplePurchase);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchase).toEqualData(samplePurchase);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Purchases) {
			// Create a sample Purchase object
			var samplePurchasePostData = new Purchases({
				name: 'New Purchase'
			});

			// Create a sample Purchase response
			var samplePurchaseResponse = new Purchases({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchase'
			});

			// Fixture mock form input values
			scope.name = 'New Purchase';

			// Set POST response
			$httpBackend.expectPOST('purchases', samplePurchasePostData).respond(samplePurchaseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Purchase was created
			expect($location.path()).toBe('/purchases/' + samplePurchaseResponse._id);
		}));

		it('$scope.update() should update a valid Purchase', inject(function(Purchases) {
			// Define a sample Purchase put data
			var samplePurchasePutData = new Purchases({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchase'
			});

			// Mock Purchase in scope
			scope.purchase = samplePurchasePutData;

			// Set PUT response
			$httpBackend.expectPUT(/purchases\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/purchases/' + samplePurchasePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid purchaseId and remove the Purchase from the scope', inject(function(Purchases) {
			// Create new Purchase object
			var samplePurchase = new Purchases({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Purchases array and include the Purchase
			scope.purchases = [samplePurchase];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/purchases\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePurchase);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.purchases.length).toBe(0);
		}));
	});
}());