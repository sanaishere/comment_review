require('dotenv').config()
const express=require('express')
const app=express()
const pool=require('./connection/connect')
const process=require('node:process')
const body_parser =require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const helmet=require('helmet')

const notfound=require('./handlers/NotFoundHandler')
const errorhandler=require('./handlers/errorhandler')
const commentroutes=require('./routers/commentrouter')
const reviewroutes=require('./routers/reviewrouter')

const PORT=6001

const corsOptions = {
  origin: 'http://localhost:6001/',
  credentials: true,
  
}
app.set('trust proxy', 1);
app.use(morgan('tiny'))  
app.use(helmet()) 

app.use(cors(corsOptions))  
app.options('*',cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:6001");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
//app.use(express.json({extended:false}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))


app.use('/api/book/comments',commentroutes)
app.use('/api/book/reviews',reviewroutes)
app.use(notfound)



app.use((err, req, res, next) => { 
  
  //console.error(err.stack); 
  if (res.headersSent) {
    return next(err)
}
return res.status(500).send(err?err.message:'INTERNAL SERVER ERROR !')
});




         
         




app.listen(PORT,()=>console.log(`listening on port ${PORT}`))


 