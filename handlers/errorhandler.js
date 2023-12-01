
const { StatusCodes } = require('http-status-codes');

const errorhandler = function(err, req, res, next) {
  
  

   res.status(500).json({ msg: 'something went wrong',err });
   
};
module.exports=errorhandler