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

const PORT=6002

const corsOptions={origin:'*', credentials :  true,  methods: 'GET,PUT,POST,DELETE,OPTIONS',exposeHeaders:['Authorization']}

app.use(cors(corsOptions))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
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


 