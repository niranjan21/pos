'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * SalesItem Schema
 */
var SalesItemSchema = new Schema({
	
  
  productName: {
		type: String,
		required: 'Please fill productName name'
	},
  
  lotOrBatchNumber: {
		type: String,
		required: 'Please fill lotOrBatchNumber name'
	},
  
  quantity: {
		type: Number,
		required: 'Please fill quantity name'
	},
  
  unitOfMeasure: {
		type: String,
		required: 'Please fill unitOfMeasure name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
	},
  
  discount: {
		type: Number,
		required: 'Please fill discount name'
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

mongoose.model('SalesItem', SalesItemSchema);