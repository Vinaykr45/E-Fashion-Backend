const express = require('express');
const authenticate = require('../Middleware/Authenticate')
const{ Addcategory_add,getcategory} = require('../Controller/Addcategory');
const {Addproducts_add,getproducts,updateproducts,deletedata,searchProduct} = require('../Controller/Addproduct')
const {addUser,loginUser,logoutUser,getUser,addAddress,forgotPass,updatepass} = require('../Controller/User');
const {order,verify,getOrder,getAllorder,updateStatus} = require('../Controller/Payment')
const {postReview,getReview} = require('../Controller/Review')
const {sendMail} = require('../Controller/Otpsend')
const router = new express.Router();

router.post('/addcategory',Addcategory_add);
router.post('/addproducts',Addproducts_add)
router.post('/updateproducts',updateproducts)
router.post('/adduser',addUser)
router.post('/login',loginUser)
router.post('/addaddress',addAddress)
router.get('/logout',logoutUser)
router.post('/deletedata',deletedata)
router.get('/getuser',getUser)
router.get('/getcategory',getcategory)
router.get('/getproducts',getproducts)
router.get('/getorder',getOrder)
router.get('/getallorder',getAllorder)
router.post('/updatestatus',updateStatus)
router.get('/userprofile',authenticate,(req,res)=>{
    res.send(req.rootUser);
})
router.post('/frogot',forgotPass)
router.post('/updatepass',updatepass)
router.get('/searchproducts',searchProduct)
router.get('/getreview',getReview)
router.post('/review',postReview)
router.post('/sendotp',sendMail)
router.post('/order',order)
router.post('/verify',verify)
module.exports = router;