'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	
  
  productName: {
		type: String,
		required: 'Please fill productName name'
	},
  
  companyName: {
		type: String,
		required: 'Please fill companyName name'
	},
  
  productCategory: {
		type: String,
		required: 'Please fill productCategory name'
	},
  
  unitOfMeasure: {
		type: String,
		required: 'Please fill unitOfMeasure name'
	},
  
  imageOfTheProduct: {
		type: String,
		required: 'Please fill imageOfTheProduct name'
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

mongoose.model('Product', ProductSchema);