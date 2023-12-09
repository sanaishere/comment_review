const express=require('express')
const router=express.Router()
const authentication=require('../authentication/authentication')
const authorization=require('../authentication/authorization')
const {createcomment,getcomments,deletecomment}=require('../controllers/commentcontroller')
const {identifybook}=require('../authentication/identifybook')
router.post('/',authentication,authorization,identifybook,createcomment)
router.delete('/:id',authentication,authorization,deletecomment)
router.get('/:id',identifybook,getcomments)


module.exports=router;