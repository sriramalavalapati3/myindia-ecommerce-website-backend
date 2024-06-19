const {userSchema} = require('./user.model');
const {productSchema} = require('./product.model');
const {orderSchema} = require('./order.model');
const mongoose = require('mongoose')

const users = mongoose.model('user',userSchema);
const products = mongoose.model('user',productSchema);
const ordersModel = mongoose.model('user',orderSchema);


module.exports = {users,products,ordersModel}