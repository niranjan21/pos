'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome to POS';
        $scope.descriptionText = 'This is a web application for POS. You can use it to maintain database of vendors, customers, inventory, and also record either cash or credit purchase and sales transactions, print receipts, day-end or period reports etc.,';
	}
]);