const {userRegister,userLogin} = require('../transactions/transaction');
const bcrypt = require('bcrypt');
const { JSONResponse, ErrorResponse } = require('../../views/views');
const handleRegister = async (req,res) =>{
try {
    const {password} = req.body;
    const hash = await bcrypt.hash(password, 4);
    req.body.password = hash;
console.log(req.body.password)
await userRegister(req);
JSONResponse(res, 201, {'msg':'user registered successfull'})
} catch (error) {
ErrorResponse(res,500,{'msg':error.message});
}
}

const handleLogin = async(req,res) => {
    try {
       const result = await userLogin(req) ;
       if(result.status){
        JSONResponse(res,200,{result,'msg':'user login successfull'})
       }else{
        ErrorResponse(res,400,{'msg':result.msg}) 
       }
       
    } catch (error) {
       ErrorResponse(res,500,{'msg':'something went wrong'}) 
    }
}

module.exports = {handleRegister,handleLogin}