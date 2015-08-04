'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Purchase = mongoose.model('Purchase'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, purchase;

/**
 * Purchase routes tests
 */
describe('Purchase CRUD tests', function() {
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

		// Save a user to the test db and create new Purchase
		user.save(function() {
			purchase = {
				name: 'Purchase Name'
			};

			done();
		});
	});

	it('should be able to save Purchase instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase
				agent.post('/purchases')
					.send(purchase)
					.expect(200)
					.end(function(purchaseSaveErr, purchaseSaveRes) {
						// Handle Purchase save error
						if (purchaseSaveErr) done(purchaseSaveErr);

						// Get a list of Purchases
						agent.get('/purchases')
							.end(function(purchasesGetErr, purchasesGetRes) {
								// Handle Purchase save error
								if (purchasesGetErr) done(purchasesGetErr);

								// Get Purchases list
								var purchases = purchasesGetRes.body;

								// Set assertions
								(purchases[0].user._id).should.equal(userId);
								(purchases[0].name).should.match('Purchase Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Purchase instance if not logged in', function(done) {
		agent.post('/purchases')
			.send(purchase)
			.expect(401)
			.end(function(purchaseSaveErr, purchaseSaveRes) {
				// Call the assertion callback
				done(purchaseSaveErr);
			});
	});

	it('should not be able to save Purchase instance if no name is provided', function(done) {
		// Invalidate name field
		purchase.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase
				agent.post('/purchases')
					.send(purchase)
					.expect(400)
					.end(function(purchaseSaveErr, purchaseSaveRes) {
						// Set message assertion
						(purchaseSaveRes.body.message).should.match('Please fill Purchase name');
						
						// Handle Purchase save error
						done(purchaseSaveErr);
					});
			});
	});

	it('should be able to update Purchase instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase
				agent.post('/purchases')
					.send(purchase)
					.expect(200)
					.end(function(purchaseSaveErr, purchaseSaveRes) {
						// Handle Purchase save error
						if (purchaseSaveErr) done(purchaseSaveErr);

						// Update Purchase name
						purchase.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Purchase
						agent.put('/purchases/' + purchaseSaveRes.body._id)
							.send(purchase)
							.expect(200)
							.end(function(purchaseUpdateErr, purchaseUpdateRes) {
								// Handle Purchase update error
								if (purchaseUpdateErr) done(purchaseUpdateErr);

								// Set assertions
								(purchaseUpdateRes.body._id).should.equal(purchaseSaveRes.body._id);
								(purchaseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Purchases if not signed in', function(done) {
		// Create new Purchase model instance
		var purchaseObj = new Purchase(purchase);

		// Save the Purchase
		purchaseObj.save(function() {
			// Request Purchases
			request(app).get('/purchases')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Purchase if not signed in', function(done) {
		// Create new Purchase model instance
		var purchaseObj = new Purchase(purchase);

		// Save the Purchase
		purchaseObj.save(function() {
			request(app).get('/purchases/' + purchaseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', purchase.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Purchase instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchase
				agent.post('/purchases')
					.send(purchase)
					.expect(200)
					.end(function(purchaseSaveErr, purchaseSaveRes) {
						// Handle Purchase save error
						if (purchaseSaveErr) done(purchaseSaveErr);

						// Delete existing Purchase
						agent.delete('/purchases/' + purchaseSaveRes.body._id)
							.send(purchase)
							.expect(200)
							.end(function(purchaseDeleteErr, purchaseDeleteRes) {
								// Handle Purchase error error
								if (purchaseDeleteErr) done(purchaseDeleteErr);

								// Set assertions
								(purchaseDeleteRes.body._id).should.equal(purchaseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Purchase instance if not signed in', function(done) {
		// Set Purchase user 
		purchase.user = user;

		// Create new Purchase model instance
		var purchaseObj = new Purchase(purchase);

		// Save the Purchase
		purchaseObj.save(function() {
			// Try deleting Purchase
			request(app).delete('/purchases/' + purchaseObj._id)
			.expect(401)
			.end(function(purchaseDeleteErr, purchaseDeleteRes) {
				// Set message assertion
				(purchaseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Purchase error error
				done(purchaseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Purchase.remove().exec();
		done();
	});
});