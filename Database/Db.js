const mongoose = require('mongoose');
const url = process.env.DB_NAME
const Connection = async() =>{
    const DB = `${url}`;
       try {
       await mongoose.connect(DB).then(() =>{
        console.log('Connection Sucessfully')
       })
       } catch (error) {
        console.log(error)
       }
}

module.exports = Connection;