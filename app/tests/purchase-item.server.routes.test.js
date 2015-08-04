'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PurchaseItem = mongoose.model('PurchaseItem'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, purchaseItem;

/**
 * Purchase item routes tests
 */
describe('Purchase item CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Purchase item
		user.save(function() {
			purchaseItem = {
				name: 'Purchase item Name'
			};

			done();
		});
	});

	it('should be able to save Purchase item instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase item
				agent.post('/purchase-items')
					.send(purchaseItem)
					.expect(200)
					.end(function(purchaseItemSaveErr, purchaseItemSaveRes) {
						// Handle Purchase item save error
						if (purchaseItemSaveErr) done(purchaseItemSaveErr);

						// Get a list of Purchase items
						agent.get('/purchase-items')
							.end(function(purchaseItemsGetErr, purchaseItemsGetRes) {
								// Handle Purchase item save error
								if (purchaseItemsGetErr) done(purchaseItemsGetErr);

								// Get Purchase items list
								var purchaseItems = purchaseItemsGetRes.body;

								// Set assertions
								(purchaseItems[0].user._id).should.equal(userId);
								(purchaseItems[0].name).should.match('Purchase item Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Purchase item instance if not logged in', function(done) {
		agent.post('/purchase-items')
			.send(purchaseItem)
			.expect(401)
			.end(function(purchaseItemSaveErr, purchaseItemSaveRes) {
				// Call the assertion callback
				done(purchaseItemSaveErr);
			});
	});

	it('should not be able to save Purchase item instance if no name is provided', function(done) {
		// Invalidate name field
		purchaseItem.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase item
				agent.post('/purchase-items')
					.send(purchaseItem)
					.expect(400)
					.end(function(purchaseItemSaveErr, purchaseItemSaveRes) {
						// Set message assertion
						(purchaseItemSaveRes.body.message).should.match('Please fill Purchase item name');
						
						// Handle Purchase item save error
						done(purchaseItemSaveErr);
					});
			});
	});

	it('should be able to update Purchase item instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase item
				agent.post('/purchase-items')
					.send(purchaseItem)
					.expect(200)
					.end(function(purchaseItemSaveErr, purchaseItemSaveRes) {
						// Handle Purchase item save error
						if (purchaseItemSaveErr) done(purchaseItemSaveErr);

						// Update Purchase item name
						purchaseItem.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Purchase item
						agent.put('/purchase-items/' + purchaseItemSaveRes.body._id)
							.send(purchaseItem)
							.expect(200)
							.end(function(purchaseItemUpdateErr, purchaseItemUpdateRes) {
								// Handle Purchase item update error
								if (purchaseItemUpdateErr) done(purchaseItemUpdateErr);

								// Set assertions
								(purchaseItemUpdateRes.body._id).should.equal(purchaseItemSaveRes.body._id);
								(purchaseItemUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Purchase items if not signed in', function(done) {
		// Create new Purchase item model instance
		var purchaseItemObj = new PurchaseItem(purchaseItem);

		// Save the Purchase item
		purchaseItemObj.save(function() {
			// Request Purchase items
			request(app).get('/purchase-items')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Purchase item if not signed in', function(done) {
		// Create new Purchase item model instance
		var purchaseItemObj = new PurchaseItem(purchaseItem);

		// Save the Purchase item
		purchaseItemObj.save(function() {
			request(app).get('/purchase-items/' + purchaseItemObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', purchaseItem.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Purchase item instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase item
				agent.post('/purchase-items')
					.send(purchaseItem)
					.expect(200)
					.end(function(purchaseItemSaveErr, purchaseItemSaveRes) {
						// Handle Purchase item save error
						if (purchaseItemSaveErr) done(purchaseItemSaveErr);

						// Delete existing Purchase item
						agent.delete('/purchase-items/' + purchaseItemSaveRes.body._id)
							.send(purchaseItem)
							.expect(200)
							.end(function(purchaseItemDeleteErr, purchaseItemDeleteRes) {
								// Handle Purchase item error error
								if (purchaseItemDeleteErr) done(purchaseItemDeleteErr);

								// Set assertions
								(purchaseItemDeleteRes.body._id).should.equal(purchaseItemSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Purchase item instance if not signed in', function(done) {
		// Set Purchase item user 
		purchaseItem.user = user;

		// Create new Purchase item model instance
		var purchaseItemObj = new PurchaseItem(purchaseItem);

		// Save the Purchase item
		purchaseItemObj.save(function() {
			// Try deleting Purchase item
			request(app).delete('/purchase-items/' + purchaseItemObj._id)
			.expect(401)
			.end(function(purchaseItemDeleteErr, purchaseItemDeleteRes) {
				// Set message assertion
				(purchaseItemDeleteRes.body.message).should.match('User is not logged in');

				// Handle Purchase item error error
				done(purchaseItemDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PurchaseItem.remove().exec();
		done();
	});
});