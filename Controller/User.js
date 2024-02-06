const users = require('../Schema/User_schema');
const usersModal = require('../Schema/User_schema');
const jwt = require('jsonwebtoken');

const addUser = async(req,res) => {
  const users = req.body.data;
  const newUser = new usersModal(users);
  try {
    if (users.name===''||users.gender===''||users.email===''||users.password==='') {
      res.status(401).json('Pelase fill all the details')
    }
    if (users.name!=''&&users.gender!=''&&users.email!=''&&users.password!='') {
    const checkEmail = await usersModal.findOne({email:newUser.email});
    if (!checkEmail) {
      newUser.save();
      res.status(201).json({msg:'User add Sucessfully',
      token:await newUser.generateToken(),
      userId:newUser._id.toString()
      }
      )
    }
    if (checkEmail) {
    res.status(401).json('User already Register')
    }
  }
  } catch (error) {
    res.status(401).json(error)
  }
}

const getUser = async(req,res)=>{
  try {
    const fetchusers = await usersModal.find();
    res.status(201).json(fetchusers);
  } catch (error) {
    res.status(401).json(error)
  }
}

const loginUser = async(req,res) => {
  const user = req.body.login;
  try {
    const email = await usersModal.findOne({email:user.useremail})
    // const password = await usersModal.({password:user.userpassword})

  if (email) {
    const result = req.body.login.userpassword === email.password;
    const token = await email.generateToken() ;
    res.cookie("jwt", token, {
      expires:new Date(Date.now()+25892000000),
      httpOnly: true,
    });
  
    if (result) {

       const verify = jwt.verify(req.cookies.jwt,process.env.SECURETKEY)
      //  console.log(verify)
        if (verify) {
          res.status(201).json('Login Sucessfully')
        }
      
      
    }
    if (!result) {
      res.status(401).json('Invalid Password')
    }
  }
  if (!email) {
    res.status(401).json('Invalid Email')
  }
  
  } catch (error) {
    res.status(401).json(error)
  }
}

const logoutUser = async(req,res) => {
   res.clearCookie('jwt',{path:'/'});
   res.status(201).json('User Logout Sucesfully')
}

module.exports = {addUser,loginUser,logoutUser,getUser}