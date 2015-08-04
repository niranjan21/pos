'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SalesItem = mongoose.model('SalesItem'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, salesItem;

/**
 * Sales item routes tests
 */
describe('Sales item CRUD tests', function() {
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

		// Save a user to the test db and create new Sales item
		user.save(function() {
			salesItem = {
				name: 'Sales item Name'
			};

			done();
		});
	});

	it('should be able to save Sales item instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sales item
				agent.post('/sales-items')
					.send(salesItem)
					.expect(200)
					.end(function(salesItemSaveErr, salesItemSaveRes) {
						// Handle Sales item save error
						if (salesItemSaveErr) done(salesItemSaveErr);

						// Get a list of Sales items
						agent.get('/sales-items')
							.end(function(salesItemsGetErr, salesItemsGetRes) {
								// Handle Sales item save error
								if (salesItemsGetErr) done(salesItemsGetErr);

								// Get Sales items list
								var salesItems = salesItemsGetRes.body;

								// Set assertions
								(salesItems[0].user._id).should.equal(userId);
								(salesItems[0].name).should.match('Sales item Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sales item instance if not logged in', function(done) {
		agent.post('/sales-items')
			.send(salesItem)
			.expect(401)
			.end(function(salesItemSaveErr, salesItemSaveRes) {
				// Call the assertion callback
				done(salesItemSaveErr);
			});
	});

	it('should not be able to save Sales item instance if no name is provided', function(done) {
		// Invalidate name field
		salesItem.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sales item
				agent.post('/sales-items')
					.send(salesItem)
					.expect(400)
					.end(function(salesItemSaveErr, salesItemSaveRes) {
						// Set message assertion
						(salesItemSaveRes.body.message).should.match('Please fill Sales item name');
						
						// Handle Sales item save error
						done(salesItemSaveErr);
					});
			});
	});

	it('should be able to update Sales item instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sales item
				agent.post('/sales-items')
					.send(salesItem)
					.expect(200)
					.end(function(salesItemSaveErr, salesItemSaveRes) {
						// Handle Sales item save error
						if (salesItemSaveErr) done(salesItemSaveErr);

						// Update Sales item name
						salesItem.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sales item
						agent.put('/sales-items/' + salesItemSaveRes.body._id)
							.send(salesItem)
							.expect(200)
							.end(function(salesItemUpdateErr, salesItemUpdateRes) {
								// Handle Sales item update error
								if (salesItemUpdateErr) done(salesItemUpdateErr);

								// Set assertions
								(salesItemUpdateRes.body._id).should.equal(salesItemSaveRes.body._id);
								(salesItemUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sales items if not signed in', function(done) {
		// Create new Sales item model instance
		var salesItemObj = new SalesItem(salesItem);

		// Save the Sales item
		salesItemObj.save(function() {
			// Request Sales items
			request(app).get('/sales-items')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sales item if not signed in', function(done) {
		// Create new Sales item model instance
		var salesItemObj = new SalesItem(salesItem);

		// Save the Sales item
		salesItemObj.save(function() {
			request(app).get('/sales-items/' + salesItemObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', salesItem.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sales item instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sales item
				agent.post('/sales-items')
					.send(salesItem)
					.expect(200)
					.end(function(salesItemSaveErr, salesItemSaveRes) {
						// Handle Sales item save error
						if (salesItemSaveErr) done(salesItemSaveErr);

						// Delete existing Sales item
						agent.delete('/sales-items/' + salesItemSaveRes.body._id)
							.send(salesItem)
							.expect(200)
							.end(function(salesItemDeleteErr, salesItemDeleteRes) {
								// Handle Sales item error error
								if (salesItemDeleteErr) done(salesItemDeleteErr);

								// Set assertions
								(salesItemDeleteRes.body._id).should.equal(salesItemSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sales item instance if not signed in', function(done) {
		// Set Sales item user 
		salesItem.user = user;

		// Create new Sales item model instance
		var salesItemObj = new SalesItem(salesItem);

		// Save the Sales item
		salesItemObj.save(function() {
			// Try deleting Sales item
			request(app).delete('/sales-items/' + salesItemObj._id)
			.expect(401)
			.end(function(salesItemDeleteErr, salesItemDeleteRes) {
				// Set message assertion
				(salesItemDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sales item error error
				done(salesItemDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		SalesItem.remove().exec();
		done();
	});
});