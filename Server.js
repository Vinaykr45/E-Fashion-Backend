const express = require('express');
const cors = require('cors');
require('dotenv').config()
const Connection = require('./Database/Db.js')
const myrouter = require('./Routers/Route.js')
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/',myrouter);

Connection();

// app.use(cors());
// app.use(express.json());
app.listen(PORT,() => {
   console.log(`Server is runing in port: ${PORT}`)
});