

const authorization=async(req,res,next)=>{
let ApiResult
try{
if(!req.role_id==2) {
ApiResult={
"result": {
           "error_code": "PermissionDenied",
           "error_message": "شما به این بخش دسترسی ندارید",
           "errors": ""
       },
       "data": ""

}
return res.status(403).send(ApiResult)
}
}catch(err){
    ApiResult={
        "result": {
                   "error_code": "PermissionDenied",
                   "error_message": err.message,
                   "errors": ""
               },
               "data": ""
        
        }
        return res.status(403).send(ApiResult)   
}
next();


}
module.exports=authorization