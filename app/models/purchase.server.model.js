'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Purchase Schema
 */
var PurchaseSchema = new Schema({
	
  
  purchaseBillNumber: {
		type: Number,
		required: 'Please fill purchaseBillNumber name'
	},
  
  purchaseBillDate: {
		type: Date,
		required: 'Please fill purchaseBillDate name'
	},
  
  partyName: {
		type: String,
		required: 'Please fill partyName name'
	},
  
  paidOrUnPaid: {
		type: String,
		required: 'Please fill paidOrUnPaid name'
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

mongoose.model('Purchase', PurchaseSchema);