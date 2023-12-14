const express = require('express');
const{ Addcategory_add,getcategory} = require('../Controller/Addcategory');
const {Addproducts_add} = require('../Controller/Addproduct')

const router = new express.Router();

router.post('/addcategory',Addcategory_add);
router.post('/addproducts',Addproducts_add)
router.get('/getcategory',getcategory)

module.exports = router;