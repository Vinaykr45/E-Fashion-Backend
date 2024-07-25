const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const adduserSchema = new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isUser:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }],
    addres:[{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
    }]
});

adduserSchema.methods.generateToken = async function(){
    try {
     let tokenUser = jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isUser:this.isUser
     },
     process.env.SECURETKEY
     );
     this.tokens = this.tokens.concat({token:tokenUser});
    //  await this.save();
     return tokenUser;
    } catch (error) {
     console.log(error)
    }
};

const users = mongoose.model('users',adduserSchema);

module.exports = users;