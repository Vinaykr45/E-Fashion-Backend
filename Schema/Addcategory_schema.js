const mongoose = require("mongoose");

const addcategorySchema = new mongoose.Schema({
   types:{
        type:String,
        required:true
       
    },
    cat_name:{
        type:String,
        required:true
    }
});

const category = mongoose.model('category',addcategorySchema);

module.exports = category;