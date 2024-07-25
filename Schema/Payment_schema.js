const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    userid:{
        type: String,
        required: true,
    },
    address:{
        type: Array,
        required: true,
    },
    order:{
        type: Array,
        required: true,
    },
    // status:{
    //     type: Number,
    //     required: true,
    // },
    date: {
        type: Date,
        default: Date.now
    },
});

const payments = mongoose.model('payment',PaymentSchema);

module.exports = payments;