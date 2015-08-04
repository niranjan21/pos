'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductCategory = mongoose.model('ProductCategory'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productCategory;

/**
 * Product category routes tests
 */
describe('Product category CRUD tests', function() {
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

		// Save a user to the test db and create new Product category
		user.save(function() {
			productCategory = {
				name: 'Product category Name'
			};

			done();
		});
	});

	it('should be able to save Product category instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product category
				agent.post('/product-categories')
					.send(productCategory)
					.expect(200)
					.end(function(productCategorySaveErr, productCategorySaveRes) {
						// Handle Product category save error
						if (productCategorySaveErr) done(productCategorySaveErr);

						// Get a list of Product categories
						agent.get('/product-categories')
							.end(function(productCategoriesGetErr, productCategoriesGetRes) {
								// Handle Product category save error
								if (productCategoriesGetErr) done(productCategoriesGetErr);

								// Get Product categories list
								var productCategories = productCategoriesGetRes.body;

								// Set assertions
								(productCategories[0].user._id).should.equal(userId);
								(productCategories[0].name).should.match('Product category Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Product category instance if not logged in', function(done) {
		agent.post('/product-categories')
			.send(productCategory)
			.expect(401)
			.end(function(productCategorySaveErr, productCategorySaveRes) {
				// Call the assertion callback
				done(productCategorySaveErr);
			});
	});

	it('should not be able to save Product category instance if no name is provided', function(done) {
		// Invalidate name field
		productCategory.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product category
				agent.post('/product-categories')
					.send(productCategory)
					.expect(400)
					.end(function(productCategorySaveErr, productCategorySaveRes) {
						// Set message assertion
						(productCategorySaveRes.body.message).should.match('Please fill Product category name');
						
						// Handle Product category save error
						done(productCategorySaveErr);
					});
			});
	});

	it('should be able to update Product category instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product category
				agent.post('/product-categories')
					.send(productCategory)
					.expect(200)
					.end(function(productCategorySaveErr, productCategorySaveRes) {
						// Handle Product category save error
						if (productCategorySaveErr) done(productCategorySaveErr);

						// Update Product category name
						productCategory.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Product category
						agent.put('/product-categories/' + productCategorySaveRes.body._id)
							.send(productCategory)
							.expect(200)
							.end(function(productCategoryUpdateErr, productCategoryUpdateRes) {
								// Handle Product category update error
								if (productCategoryUpdateErr) done(productCategoryUpdateErr);

								// Set assertions
								(productCategoryUpdateRes.body._id).should.equal(productCategorySaveRes.body._id);
								(productCategoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Product categories if not signed in', function(done) {
		// Create new Product category model instance
		var productCategoryObj = new ProductCategory(productCategory);

		// Save the Product category
		productCategoryObj.save(function() {
			// Request Product categories
			request(app).get('/product-categories')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Product category if not signed in', function(done) {
		// Create new Product category model instance
		var productCategoryObj = new ProductCategory(productCategory);

		// Save the Product category
		productCategoryObj.save(function() {
			request(app).get('/product-categories/' + productCategoryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productCategory.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Product category instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product category
				agent.post('/product-categories')
					.send(productCategory)
					.expect(200)
					.end(function(productCategorySaveErr, productCategorySaveRes) {
						// Handle Product category save error
						if (productCategorySaveErr) done(productCategorySaveErr);

						// Delete existing Product category
						agent.delete('/product-categories/' + productCategorySaveRes.body._id)
							.send(productCategory)
							.expect(200)
							.end(function(productCategoryDeleteErr, productCategoryDeleteRes) {
								// Handle Product category error error
								if (productCategoryDeleteErr) done(productCategoryDeleteErr);

								// Set assertions
								(productCategoryDeleteRes.body._id).should.equal(productCategorySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Product category instance if not signed in', function(done) {
		// Set Product category user 
		productCategory.user = user;

		// Create new Product category model instance
		var productCategoryObj = new ProductCategory(productCategory);

		// Save the Product category
		productCategoryObj.save(function() {
			// Try deleting Product category
			request(app).delete('/product-categories/' + productCategoryObj._id)
			.expect(401)
			.end(function(productCategoryDeleteErr, productCategoryDeleteRes) {
				// Set message assertion
				(productCategoryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Product category error error
				done(productCategoryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductCategory.remove().exec();
		done();
	});
});