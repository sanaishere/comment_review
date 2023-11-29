
const { StatusCodes } = require('http-status-codes');
const errorhandler = (err, req, res, next) => {
  // console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
module.exports=errorhandler