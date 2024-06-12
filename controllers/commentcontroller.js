const pool=require('../connection/connect')
require('express-async-errors')
const Joi=require('joi')
const createcomment=async(req,res)=>{
  

const {bookId,comment}=req.body
const{error,data}=validating({bookId,comment})
if(error){
  const ApiResult={
    "result": {
               "error_code": "clienterror",
               "error_message":error ,
               "errors": ""
           },
           "data": ""
} 
return res.status(400).send(ApiResult)
}

else{
const isDelete=false;
const userId=req.user_id
const createdDate= new Date().toISOString();

let resbook
let test=`SELECT * FROM user_books WHERE user_id=${userId} AND book_id=${bookId}`
await pool.query(test).catch(err=>{
  console.log(err) 
  
return res.status(500).json({"result": {
  "error_code": "database error",
  "error_message": err,
  "errors": ""
},
"data": ""
} )}).then(item=>{ resbook=item})

if(resbook.rowCount===0){
return res.status(400).json({"result": {
"error_code": "database error",
"error_message": "شما این کتاب را تهیه نکرده اید.",
"errors": ""
},
"data": ""
} )
}


let query=`INSERT INTO  comments (book_id,user_id,comment,is_delete,created_date) VALUES('${bookId}','${userId}','${comment}',
'${isDelete}','${createdDate}')`

 pool.query(query,(err,data)=>{

 
  
  
           if(err){
            
            const ApiResult={
              "result": {
                         "error_code": "databaseerror",
                         "error_message":  err.detail,
                         "errors": ""
                     },
                     "data": ""
          }  
          return res.status(500).send(ApiResult)
           } else{
            const ApiResult={
              "result": {
                         "error_code": "",
                         "error_message":"" ,
                         "errors": ""
                     },
                     "data": ""
          }  
           return  res.status(200).send(ApiResult)
           }
          
}) 
 } 
}
const getcommentspub=async(req,res)=>{
  const bookId=parseInt(req.params.id)
           
         
          pool.query(`SELECT c.id,book_id,comment,created_date,username FROM comments c  JOIN users u  ON c.user_id=u.id WHERE book_id=${bookId} AND is_delete=false ORDER BY  created_date DESC `,(err,result)=>{
          if(err){
            const ApiResult={
              "result": {
                         "error_code": "databaseerror",
                         "error_message":  err.detail,
                         "errors": ""
                     },
                     "data": ""
          }  
          return res.status(500).send(ApiResult)

          }
          
           if(result.rowCount===0){
                  const ApiResult={
                      "result": {
                                 "error_code": "",
                                 "error_message":"",
                                 "errors": ""
                             },
                             "data": ""
                  }  
                  return res.status(200) .send(ApiResult) 
     
                  

}
else{
  
      const ApiResult={
            "result": {
                       "error_code": "",
                       "error_message": "",
                       "errors": ""
                   },
                   "data"
                       :result.rows,
                       
                       
                      }
      
       //result.rows.slice(indexdata,rowcounts)           
       
  res.status(200).send(ApiResult)}
}
)}
const getcomments=async(req,res)=>{
  

  let pageIndex
            
           // pageIndex=req.query.page?parseInt(req.query.page):1
           pageIndex=parseInt(req.query.page)
            const bookId=parseInt(req.params.id)
           
         
          pool.query(`SELECT c.id,book_id,comment, created_date,username FROM comments c  JOIN users u  ON c.user_id=u.id WHERE 
          book_id=${bookId} AND is_delete=false ORDER BY  created_date DESC `,(err,result)=>{
          if(err){
            const ApiResult={
              "result": {
                         "error_code": "databaseerror",
                         "error_message":  err.detail,
                         "errors": ""
                     },
                     "data": ""
          }  
          return res.status(500).send(ApiResult)

          }
          
           if(result.rowCount===0){
                  const ApiResult={
                      "result": {
                                 "error_code": "",
                                 "error_message":"",
                                 "errors": ""
                             },
                             "data": ""
                  }  
                  return res.status(200) .send(ApiResult) 
           }else{
            let sum
            const rowcounts=result.rowCount
            const limit=5
            const count=Math.ceil(rowcounts/limit)
            const rowinthispage=rowcounts%limit
            const indexdata=(pageIndex-1)*limit
            const data=pageIndex*limit
            const page=rowcounts-data
            if(page>=0){
               sum=limit
            }
            else{
              sum=rowinthispage
            }
                const ApiResult={
                      "result": {
                                 "error_code": "",
                                 "error_message": "",
                                 "errors": ""
                             },
                             "data":{
                              "page_size":limit,
                              "page_index":pageIndex,
                              "count":count,
                               "data": 
                               result.rows.slice(indexdata,indexdata+sum)
                                 
                                 }
                                }
                
                 //result.rows.slice(indexdata,rowcounts)           
                 
            res.status(200).send(ApiResult)}
          }
          )}
           


const deletecomment=async(req,res)=>{
 
           const commentId= parseInt(req.params.id)
          
          
           const userId=req.user_id
//            await pool.query(`SELECT * FROM Comments WHERE id=${commentId} AND UserId=${userId}`)
//             .catch(err=>{
//               console.log(err) 
              
//           return res.status(500).json({"result": {
//               "error_code": "database error",
//               "error_message": err,
//               "errors": ""
//           },
//           "data": ""
// } )}).then(e=>{result=e})
// console.log(result)
// if(result.rows.length===0){
//   return res.status(500).json({"result": {
//     "error_code": "database error",
//     "error_message": "cannot get property of undefined",
//     "errors": ""
// },
// "data": ""
// } )
// }

           
          
          
            
            pool.query(`UPDATE comments SET is_delete=true WHERE id=${commentId} AND user_id=${userId}`,(err,result)=>{
          if(err){
            const ApiResult={
              "result": {
                         "error_code": "databaseerror",
                         "error_message":  err.detail,
                         "errors": ""
                     },
                     "data": ""
          }  
          return res.status(500).send(ApiResult)
          }
          if(result.rowCount===0){
            console.log(result)
            const ApiResult={
              "result": {
                         "error_code": "databaseeeror",
                         "error_message": "شما نمی توانید این کامنت را پاک کنید.",
                         "errors": ""
                     },
                     "data": ""
          }  
           return res.status(400).send(ApiResult)
          }
           if(result.rowCount>0){
            console.log(result)
            const ApiResult={
              "result": {
                         "error_code": "",
                         "error_message": "",
                         "errors": ""
                     },
                     "data": ""
          }  
           return res.status(200).send(ApiResult)
          }
        })
        }
          
      

          function validating({bookId,comment}){
            const schema=Joi.object({
                     bookId:  Joi.number().required(),
                     comment:Joi.required(),
                    
            })
            return schema.validate({bookId,comment})
 }

module.exports={createcomment,getcomments,deletecomment,getcommentspub}