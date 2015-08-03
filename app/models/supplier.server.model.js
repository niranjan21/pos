'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Supplier Schema
 */
var SupplierSchema = new Schema({
	
  
  name: {
		type: String,
		required: 'Please fill name name'
	},
  
  mobileNumber: {
		type: Number,
		required: 'Please fill mobileNumber name'
	},
  
  address: {
		type: String,
		required: 'Please fill address name'
	},
  
  email: {
		type: String,
		required: 'Please fill email name'
	},
  
  pan: {
		type: String,
		required: 'Please fill pan name'
	},
  
  tin: {
		type: String,
		required: 'Please fill tin name'
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

mongoose.model('Supplier', SupplierSchema);