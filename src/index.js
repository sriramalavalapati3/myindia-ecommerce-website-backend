const express = require('express');
const {connection} = require('../config/config');
const {userRoute} = require('./routes/user');
const {productRoute} = require('./routes/product');
const {paymentRoute} = require('./routes/order')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/api',userRoute);
app.use('/api',productRoute);
app.use('/api',paymentRoute);

app.get('/')
app.get('/',async(req,res)=>{
    try {
        res.status(201).send({'msg':'welcome to myindia'});
    } catch (error) {
        res.status(500).send({'msg':'something went wrong'});
    }
});
app.get('/paymentSuccess',async(req,res)=>{
    try {
        res.status(200).send({'msg':'payment sucessfull'});
    } catch (error) {
        res.status(500).send({'msg':'something went wrong'});
    }
});
app.get('/paymentCancel',async(req,res)=>{
    try {
        res.status(200).send({'msg':'payment canceled succesfull'});
    } catch (error) {
        res.status(500).send({'msg':'something went wrong'});
    }
});

const port = process.env.PORT

app.listen( port , async(req,res)=>{
try {
    await connection;
    console.log(`Server is running on port ${port}`);
} catch (error) {
    console.log(error);
}
})