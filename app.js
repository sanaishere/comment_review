require('dotenv').config()
const express=require('express')
const app=express()
const pool=require('./connection/connect')

const body_parser =require('body-parser')
const notfound=require('./handlers/NotFoundHandler')
const errorhandler=require('./handlers/errorhandler')
const commentroutes=require('./routers/commentrouter')
const reviewroutes=require('./routers/reviewrouter')
const PORT=6000

//app.use(express.json({extended:false}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
  
  pool.query('SELECT * FROM Users',(err,data)=>{
    if(err){
      throw new Error(err)
    }
    return res.send(data.rows)
  })
    
    return res.send(data.rows)
  
})
app.use('/api/book/comments',commentroutes)
app.use('/api/book/reviews',reviewroutes)
app.use(notfound)
app.use(errorhandler)
app.listen(PORT,()=>console.log(`listening on port ${PORT}`))


 