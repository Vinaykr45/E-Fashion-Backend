const express = require('express');
const authenticate = require('../Middleware/Authenticate')
const{ Addcategory_add,getcategory} = require('../Controller/Addcategory');
const {Addproducts_add,getproducts,updateproducts,deletedata} = require('../Controller/Addproduct')
const {addUser,loginUser,logoutUser,getUser} = require('../Controller/User');
const router = new express.Router();

router.post('/addcategory',Addcategory_add);
router.post('/addproducts',Addproducts_add)
router.post('/updateproducts',updateproducts)
router.post('/adduser',addUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.post('/deletedata',deletedata)
router.get('/getuser',getUser)
router.get('/getcategory',getcategory)
router.get('/getproducts',getproducts)
router.get('/userprofile',authenticate,(req,res)=>{
    res.send(req.rootUser);
})

module.exports = router;