const mongoose = require('mongoose');

const Connection = async() =>{
    const DB = 'mongodb+srv://vinaykumarpatel75:Vinaykr%4075@cluster0.jwskmnj.mongodb.net/?retryWrites=true&w=majority';
       try {
       await mongoose.connect(DB).then(() =>{
        console.log('Connection Sucessfully')
       })
       } catch (error) {
        console.log(error)
       }
}

module.exports = Connection;