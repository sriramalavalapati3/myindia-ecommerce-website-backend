const {User} = require('../../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRegister = async(req) =>{
    try {
      const {name,mobile,email,password,address,userType} = req.body;
      console.log(name,mobile,email,password,address,userType);
      const userdata = new User({
        name,
        mobile,
        email,
        password,
        address,
        userType
      });
      await userdata.save();
      return userdata 
    } catch (error) {
        return error
    }
}

const userLogin = async(req,res) =>{
try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            const token =  jwt.sign({_id:user._id},process.env.secretTokenKey,{ expiresIn: '1h' });
            return {'status':true,user,token};
          } else {
            return {"status":false,"msg":'please enter valid credentials'};
          }
}else{
    return {"status":false,'msg':'please register'}
}
} catch (error) {
    return error
}
}


module.exports = {userRegister,userLogin}