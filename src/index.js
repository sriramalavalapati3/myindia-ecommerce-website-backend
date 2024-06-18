const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()

app.get('/',async(req,res)=>{
    try {
        res.status(201).send({'msg':'welcome to myindia'});
    } catch (error) {
        res.status(500).send({'msg':'something went wrong'});
    }
})

app.listen(process.env.PORT || 5050 , async(req,res)=>{
try {
    console.log(`Server is running on port ${process.env.PORT}`);
} catch (error) {
    console.log(error);
}
})