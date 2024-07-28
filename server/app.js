const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const dbConnection = require('./configDB/dbConnection');
const usersRouter = require('./api/routers/users.routers');
const productsRouter = require('./api/routers/products.routers');
const httpStatusText = require('./api/utils/httpStatusText');

const app = express()

//config the cors
 // to solve cors policy 'Cross Origin Resourse Sharing'
app.use(cors({
    origin:'http://127.0.0.1:5501', // Replace with your front-end origin
    credentials: true
  }));
//config the body-parser
app.use(express.json());
app.use(cookieParser());

//config the routes
app.use('/api/users',usersRouter);
app.use('/api/products',productsRouter);


// const url = 'mongodb://localhost:27017/musaedDB'
// const port = 3000

// connect to db
dbConnection();


// gloable middleware for not found router 
// app.all('*',(req,res,next)=>{
//     return res.json({status:httpStatusText.ERROR,Message:'This resourse is not available'});
//   })
// mongoose.connect(url,{})
// .then(result => console.log('database connected'+result))
// .catch(error => console.log('error=>'+error))

app.get('/',(req,res) =>{
    res.send('<h1>hello from node js</h1>')
})

app.get('/hi',(req,res) =>{
    res.send('<h1>hi from node js</h1>')
})


//starting the server
app.listen(3000,()=>{
    console.log('app listing on port 3000');
})