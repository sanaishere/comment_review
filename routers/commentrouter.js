const express=require('express')
const router=express.Router()
const authentication=require('../authentication/authentication')
const authorization=require('../authentication/authorization')
const {createcomment,getcomments,deletecomment}=require('../controllers/commentcontroller')
router.post('/',authentication,authorization,createcomment)
router.delete('/:id',authentication,authorization,deletecomment)
router.get('/:id',authentication,authorization,getcomments)


module.exports=router;