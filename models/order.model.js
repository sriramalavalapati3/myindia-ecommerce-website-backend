const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    'Product':{
        type:String,
    },
    'amount':{
        type:Number,
    },
    'productQuantity':{
        type:Number
    },
    'user':{
        type:String,
        required:true,
    },
    'ProductId':{
        type:String,
    },
    'billingAddress':{
        type:String,
        required : true,
    },
    'paymentIntentId':{
        type:String
    },
    'paymentStatus': {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
});

module.exports = {orderSchema}