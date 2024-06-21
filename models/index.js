const {userSchema} = require('./user.model');
const {productSchema} = require('./product.model');
const {orderSchema} = require('./order.model');
const {paymentSchema} = require('./payment.model');
const mongoose = require('mongoose')

const User = mongoose.model('user',userSchema);
const products = mongoose.model('products',productSchema);
const orders = mongoose.model('orders',orderSchema);
const payment = mongoose.model('Payment', paymentSchema)


module.exports = {User,products,orders,payment};