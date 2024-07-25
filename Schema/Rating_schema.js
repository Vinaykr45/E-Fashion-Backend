const mongoose = require("mongoose");

const Rating_schema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        require:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        require:true
    }
})

const review = mongoose.model('review',Rating_schema);

module.exports = review;