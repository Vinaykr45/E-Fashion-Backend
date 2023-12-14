const mongoose = require("mongoose");

const addproductSchema = new mongoose.Schema({
    types:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    product_sprice:{
        type:Number,
        required:true
    },
    product_stock:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    feature:{
        type:Boolean,
        required:true
    },
});

const products = mongoose.model('products',addproductSchema);

module.exports = products;