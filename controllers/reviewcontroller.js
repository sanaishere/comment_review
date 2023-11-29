const Joi=require('joi')

const pool=require('../connection/connect')

const createreview=async(req,res)=>{

           const {bookId,rating}=await req.body
          const {error,data}= validating(rating)
          if(error){
          return res.status(500).send(error)
          }
           const userId=req.user_id
           const createdDate= new Date().toISOString();
           let query=`INSERT INTO  Reviews (BookId,UserId,Rating,CreatedAt) VALUES('${bookId}','${userId}','${rating}','${createdDate}')`
 pool.query(query,(err,data)=>{
           if(err){
                      throw new Error(err)     
           }
            res.status(201).send(data.rows)
}) 
}
const getreview=async(req,res)=>{
    const bookId=req.body.bookid
    const reviews=await pool.query(`SELECT * FROM Reviews WHERE BookId=${bookId}`)
 return res.status(201).send(reviews.rows)
}
           
           
const updatereview=async(req,res)=>{
           const reviewid=parseInt(req.params.id)
           const userId=req.user_id
           const uresidofreview=await pool.query(`SELECT UserId FROM Reviews WHERE id=${reviewid}`)
           const {rating}=req.body
           if(!(parseInt(userId)===parseInt(uresidofreview.rows[0].userid))){
          const ApiResult={
                      "result":{
                      "error_code": "UpdateReviewError",
                      "error_message": "چنین امتیازی از جانب شما برای این کتاب ثبت نشده است",
                      "errors": ""
                  },
                  "data":""
           
           }
           return res.status(400).send(ApiResult)
                      
           }
           else{
           let query=`UPDATE Reviews SET Rating=${rating} WHERE id=${reviewid} AND UserId=${userId}`
           pool.query(query,(err,data)=>{
                      if(err){
                                 throw new Error(err)     
                      }
                       res.status(200).send(data.rows)
           }) 
           
            return res.status(200).send(data.rows)
           
}
}
const averageratings=async(req,res)=>{
const bookid=parseInt(req.params.id)

let query=`SELECT AVG(Rating) FROM Reviews WHERE BookId=${bookid}`
pool.query(query,(err,data)=>{
           if(err){
                      throw new Error(err)     
           }
          

const ApiResult={
    "result":{
    "error_code": "",
    "error_message":"",
    "errors": ""
},
"data":data.rows[0].avg

}
 return res.status(200).send(ApiResult)
})
}
        
function validating(item){
           const schema=
                      Joi.number().min(1).max(5)
           
           return schema.validate(item)
}
module.exports={createreview,updatereview,averageratings,getreview}