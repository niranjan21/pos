'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
	
  
  productName: {
		type: String,
		required: 'Please fill productName name'
	},
  
  lotOrBatchNumber: {
		type: String,
		required: 'Please fill lotOrBatchNumber name'
	},
  
  expiryDate: {
		type: Date,
		required: 'Please fill expiryDate name'
	},
  
  quantity: {
		type: Number,
		required: 'Please fill quantity name'
	},
  
  purchasePrice: {
		type: Number,
		required: 'Please fill purchasePrice name'
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

mongoose.model('Inventory', InventorySchema);