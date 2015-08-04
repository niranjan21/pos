'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductCategory Schema
 */
var ProductCategorySchema = new Schema({
	
  
  categoryName: {
		type: String,
		required: 'Please fill categoryName name'
	},
  
  imageOfTheCategory: {
		type: String,
		required: 'Please fill imageOfTheCategory name'
	},
  
  
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ProductCategory', ProductCategorySchema);