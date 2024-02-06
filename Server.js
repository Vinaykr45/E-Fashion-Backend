const express = require('express');
const cors = require('cors');
require('dotenv').config()
const Connection = require('./Database/Db.js')
const myrouter = require('./Routers/Route.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 5000000 }));
app.use(cors({
   credentials: true,
   origin: "http://localhost:3000",
 }));
app.use('/',myrouter);

Connection();
// app.use(cors());

app.listen(PORT,() => {
   console.log(`Server is runing in port: ${PORT}`)
});