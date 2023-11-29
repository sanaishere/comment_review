const pool=require('../connection/connect')


const createcomment=async(req,res)=>{
  

const {bookId,comment}=req.body
const isDelete=false;
const userId=req.user_id
const createdDate= new Date().toISOString().slice(0, 10);

let query=`INSERT INTO  Comments (BookId,UserId,Comment,IsDelete,CreatedDate) VALUES('${bookId}','${userId}','${comment}',
'${isDelete}','${createdDate}')`
 pool.query(query,(err,data)=>{
           if(err){
                      throw new Error(err)     
           }
            res.status(201).send(data.rows)
}) 
 return res.status(201).send(data.rows)
}
const getcomments=async(req,res)=>{
           const pageIndex=parseInt(req.query.pageindex)

           
          
           const bookid=parseInt(req.params.id)
          
           const result= await pool.query(`SELECT c.id,BookId,Comment,CreatedDate,Username FROM Comments c  JOIN Users u  ON c.UserId=u.id WHERE BookId=${bookid} AND IsDelete=false `)
           if(result.rowCount==0){
                  const ApiResult={
                      "result": {
                                 "error_code": "CommentsNotFound",
                                 "error_message": "کامنتی برای این کتاب وجود ندارد",
                                 "errors": ""
                             },
                             "data": ""
                  }  
                  return res.status(400) .send(ApiResult) 
           }else{
            let sum
            const rowcounts=result.rowCount
            const limit=5
            
            const rowinthispage=rowcounts%limit
            const indexdata=(pageIndex-1)*limit
            const data=pageIndex*3
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
                               "data": 
                               result.rows.slice(indexdata,indexdata+sum)
                                 
                                 }
                
                 result.rows.slice(indexdata,rowcounts)           
         
           res.status(200).send(ApiResult)
           }

}
const deletecomment=async(req,res)=>{
           const commentId=parseInt(req.params.id)
           const userId=req.user_id
           const userofcomment=await pool.query(`SELECT UserId FROM Comments WHERE id=${commentId}`)
           
          
          
            //if(!(parseInt(userId)===parseInt(userofcomment.rows[0].userid))){
                     // return res.status(500).send('cant delet this comment cause you did not write it')
            //}
           const result=await pool.query(`UPDATE Comments SET IsDelete=true WHERE id=${commentId} AND UserId=${userId}`)
          if(result){
           res.status(200).json({data:'successfully deleted'})
          }
}         



module.exports={createcomment,getcomments,deletecomment}