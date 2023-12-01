require('dotenv').config()
const jwt=require('jsonwebtoken')

const authentication=async(req,res,next)=>{
           let token

const authheader=req.headers.authorization
 token=authheader?.split(' ')[1]

let ApiResult
try{
if(!token){
            ApiResult={
           
                      "result": {
                                 "error_code": "UnAuthorized",
                                 "error_message": "برای دسترسی به این بخش باید لاگین شوید",
                                 "errors": ""
                             },
                             "data": "" 
           
}
           
         
         return res.status(401).send(ApiResult)

}

const decoded=jwt.verify(token,process.env.JWT_SECRET)
if(!decoded){
           throw new Error('token is probably wrong')
}
req.user_id=decoded.user_id
req.role_id=decoded.role_id
}catch(err){
    return res.status(500).send(err)
}

next();
}
module.exports=authentication