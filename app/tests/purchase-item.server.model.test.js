'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PurchaseItem = mongoose.model('PurchaseItem');

/**
 * Globals
 */
var user, purchaseItem;

/**
 * Unit tests
 */
describe('Purchase item Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			purchaseItem = new PurchaseItem({
				name: 'Purchase item Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return purchaseItem.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			purchaseItem.name = '';

			return purchaseItem.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PurchaseItem.remove().exec();
		User.remove().exec();

		done();
	});
});