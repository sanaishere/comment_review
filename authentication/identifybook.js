
const pool=require('../connection/connect')
const identifybook=async(req,res,next)=>{
const bookId=req.body.bookId?req.body.bookId:req.params.id;
let query={text:`SELECT * FROM Books WHERE id=$1`,values:[bookId]}

let uresidofreview
await pool.query(query).catch(err=>{
  console.log(err) 
  
return res.status(500).json({"result": {
  "error_code": "database error",
  "error_message": err,
  "errors": ""
},
"data": ""
} )}).then(e=>{ uresidofreview=e})

if(uresidofreview.rows.length===0){
return res.status(404).json({"result": {
"error_code": "database error",
"error_message": "کتابی با این آیدی پیدا نشد.",
"errors": ""
},
"data": ""
} )
}
next();



}
module.exports={identifybook}