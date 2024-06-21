const express =  require('express');
const paymentRoute = express.Router();
const orderRoute = express.Router();
const {handleCheckout,handleStripeHooks} = require('../controllers/controller');
const {auth,authorize} = require('../../middlewares/autherization');
const bodyParser = require('body-parser');

paymentRoute.post('/orderCheckout',auth,authorize(['seller','customer','admin']),handleCheckout);

paymentRoute.post('/paymentStatus', express.raw({ type: 'application/json' }),handleStripeHooks )



module.exports = {paymentRoute};

