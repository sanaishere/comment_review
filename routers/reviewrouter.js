const express=require('express')
const router=express.Router()
const authentication=require('../authentication/authentication')
const authorization=require('../authentication/authorization')
const {createreview,updatereview,averageratings,getreview}=require('../controllers/reviewcontroller')
const {identifybook}=require('../authentication/identifybook')
router.post('/',authentication,authorization,identifybook,createreview)
router.put('/:id',authentication,authorization,updatereview)
router.get('/:id',identifybook,averageratings)
router.get('/getreview',getreview)
module.exports=router;