const Joi=require('joi')
require('express-async-errors')
const pool=require('../connection/connect')

const createreview=async(req,res)=>{


let resulttest
           const {bookId,rating}=await req.body
           const userId=req.user_id
           let testuserbooks=`SELECT * FROM user_books WHERE user_id=${userId} AND book_id=${bookId}`
           await pool.query(testuserbooks).catch(err=>{
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
           


           let query
          const {error,data}= validating({bookId,rating})
          if(error){
            const ApiResult={
                    "result": {
                               "error_code": "clientrror",
                               "error_message":error,
                               "errors": ""
                           },
                           "data": ""
                }  
                return res.status(400).send(ApiResult)
          }
           
           let test=`SELECT id FROM reviews WHERE user_id=${userId} AND book_id=${bookId}`
           await pool.query(test).catch(err=>{
                console.log(err) 
            return res.status(500).json({"result": {
                "error_code": "database error",
                "error_message": err,
                "errors": ""
            },
            "data": ""
 } )}).then(e=>{ resulttest=e})
 console.log(resulttest)
           if(resulttest.rowCount>0){
            console.log('before did it')
            query=`UPDATE reviews SET rating=${rating} WHERE id=${resulttest.rows[0].id} AND user_id=${userId}`
            pool.query(query,(err,data)=>{
                if(err){
                  const ApiResult={
                      "result": {
                                 "error_code": "database error",
                                 "error_message": err.detail,
                                 "errors": ""
                             },
                             "data": ""
                  } 
                 return res.status(500).send(ApiResult)        
                }
            //     if(data.rows.length===0){
            //         return res.status(500).json({"result": {
            //             "error_code": "database error",
            //             "error_message": "not get property of undefined",
            //             "errors": ""
            //         },
            //         "data": ""
            // } )
            //     }
                const ApiResult={
                  "result": {
                             "error_code": "",
                             "error_message": "",
                             "errors": ""
                         },
                         "data": ""
              }  
                return res.status(200).send(ApiResult)
     }) 
            // const ApiResult={
            //     "result":{
            //     "error_code": "Duplicateuser",
            //     "error_message": " امتیازی از جانب شما برای این کتاب ثبت شده است",
            //     "errors": ""
            // },
            // "data":""
     
     }
            //return res.status(400).send(ApiResult)
           //}
           else{
           const createdDate= new Date().toISOString();
            query=`INSERT INTO  reviews (book_id,user_id,rating,created_at) VALUES('${bookId}','${userId}','${rating}','${createdDate}')`
 pool.query(query,(err,data)=>{
           if(err){
            const ApiResult={
                "result": {
                           "error_code": "database error",
                           "error_message": err.detail,
                           "errors": ""
                       },
                       "data": ""       
          }
          return res.status(500).send(ApiResult)     
           }
           const ApiResult={
            "result": {
                       "error_code": "",
                       "error_message": "",
                       "errors": ""
                   },
                   "data": ""
        }  
          return res.status(200).send(ApiResult)
}) 
}
}
const getreview=async(req,res)=>{

    let bookId=parseInt(req.body.bookid);
    if(!bookId){
        throw new Error('bookid required')
    }
    bookId=parseInt(bookId);
    const reviews=await pool.query(`SELECT * FROM reviews WHERE book_id=${bookId}`)
    const ApiResult={
        "result": {
                   "error_code": "",
                   "error_message": "",
                   "errors": ""
               },
               "data" :
                reviews.rows,
               
            }
    
 return res.status(200).send(ApiResult)
        }

           
           
const updatereview=async(req,res)=>{
           let reviewid=await req.params.id
           reviewid=parseInt(reviewid)
           let ApiResult
    
           const userId=req.user_id
           let query={text:`SELECT user_id FROM reviews WHERE id=$1`, values:[reviewid]}
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
        return res.status(500).json({"result": {
            "error_code": "database error",
            "error_message": "not get property of undefined",
            "errors": ""
        },
        "data": ""
} )
    }
            

            

            
        
        
           const {rating}=req.body
       
           if(!(parseInt(userId)===parseInt(uresidofreview.rows[0].user_id))){
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
            //try{
           let query=`UPDATE reviews SET rating=${rating} WHERE id=${reviewid} AND user_id=${userId}`

        


           pool.query(query,(err,data)=>{
                      if(err){
                        const ApiResult={
                            "result": {
                                       "error_code": "database error",
                                       "error_message": err.detail,
                                       "errors": ""
                                   },
                                   "data": ""
                        } 
                       return res.status(500).send(ApiResult)        
                      }
                      const ApiResult={
                        "result": {
                                   "error_code": "",
                                   "error_message": "",
                                   "errors": ""
                               },
                               "data": ""
                    }  
                      return res.status(200).send(ApiResult)
           }) 
           
            
           
}
}
const averageratings=async(req,res)=>{
let bookId=await req.params.id
bookId=parseInt(bookId)

    
let query=`SELECT AVG(rating) FROM reviews WHERE book_id=${bookId}`
pool.query(query,(err,data)=>{
           if(err){
            const ApiResult={
                "result": {
                           "error_code": "database error",
                           "error_message": err.detail,
                           "errors": ""
                       },
                       "data": ""
            } 
           return res.status(500).send(ApiResult) 
           }else if(data.rows.length===0){
            return res.status(500).json({"result": {
                "error_code": "database error",
                "error_message": "not get property of undefined",
                "errors": ""
            },
            "data": ""
    } )
           }else if(data.rows[0].avg==null){
            return res.status(200).json({"result": {
                "error_code": "",
                "error_message": "",
                "errors": ""
            },
            "data": 0
    } )
            }
          
else{
    console.log(data.rows)
const ApiResult={
    "result":{
    "error_code": "",
    "error_message":"",
    "errors": ""
},
"data":Math.round(parseFloat(data.rows[0].avg)*10)/10

}
 return res.status(200).send(ApiResult)
}
})
}
        
function validating({bookId,rating}){
           const schema=Joi.object({
            rating: Joi.number().min(1).max(5).required(),
           bookId:Joi.number().required()
           })
           
                      
           
           return schema.validate({bookId,rating})
}
module.exports={createreview,updatereview,averageratings,getreview}