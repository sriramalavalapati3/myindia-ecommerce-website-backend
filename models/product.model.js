const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    'product':{
        type:String,
        required:true
    },
    'productCategory':{
        type:String,
    },
    'productDescription':{
        type:String,
    },
    'productQuantity':{
        type:String,
    },
    'productPrize':{
        type:Number
    },
    'logisticOwner':{
        type:String
    }
});

module.exports = {productSchema}