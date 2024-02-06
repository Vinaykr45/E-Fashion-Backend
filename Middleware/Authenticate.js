const jwt = require('jsonwebtoken');
const user = require('../Schema/User_schema');
const Authenticate = async(req,res,next) =>{
try {

    const token =req.cookies.jwt;
    const verify = jwt.verify(token,process.env.SECURETKEY);
    
    const rootUser  = await user.findOne({_id:verify.userId});
    req.token=token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
    
} catch (error) {
    res.status(402).json('Unatutorized')
    console.log(error)
}
}

module.exports = Authenticate