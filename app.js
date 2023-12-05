require('dotenv').config()
const express=require('express')
const app=express()
const pool=require('./connection/connect')
const process=require('node:process')
const body_parser =require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const helmet=require('helmet')
const xss=require('xss')
const notfound=require('./handlers/NotFoundHandler')
const errorhandler=require('./handlers/errorhandler')
const commentroutes=require('./routers/commentrouter')
const reviewroutes=require('./routers/reviewrouter')

const PORT=6001


app.use(morgan('tiny'))  
app.use(helmet()) 
app.use(cors())  

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


 