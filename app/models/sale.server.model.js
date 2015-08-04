'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sale Schema
 */
var SaleSchema = new Schema({
	
  
  cashOrCreditSales: {
		type: String,
		required: 'Please fill cashOrCreditSales name'
	},
  
  partyName: {
		type: String,
		required: 'Please fill partyName name'
	},
  
  salesBillNumber: {
		type: Number,
		required: 'Please fill salesBillNumber name'
	},
  
  saleDateAndTime: {
		type: Date,
		required: 'Please fill saleDateAndTime name'
	},
  
  totalAmount: {
		type: Number,
		required: 'Please fill totalAmount name'
	},
  
  totalDiscount: {
		type: Number,
		required: 'Please fill totalDiscount name'
	},
  
  taxes: {
		type: Number,
		required: 'Please fill taxes name'
	},
  
  paymentMethod: {
		type: String,
		required: 'Please fill paymentMethod name'
	},
  
  cardTransactionId: {
		type: String,
		required: 'Please fill cardTransactionId name'
	},
  
  cardTransactionTimeStamp: {
		type: Date,
		required: 'Please fill cardTransactionTimeStamp name'
	},
  
  cardTransactionBankAuthorizationId: {
		type: String,
		required: 'Please fill cardTransactionBankAuthorizationId name'
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

mongoose.model('Sale', SaleSchema);