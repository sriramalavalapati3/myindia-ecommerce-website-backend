const express = require('express');
const userRoute = express.Router();
const {validateUser, validateLogin} = require('../../middlewares/validation');
const {handleRegister,handleLogin} = require('../controllers/controller');
const {loginLimiter} = require('../../middlewares/ratelimit')

userRoute.post("/register",validateUser, handleRegister);

userRoute.post('/login',validateLogin ,loginLimiter, handleLogin);

module.exports = {userRoute}