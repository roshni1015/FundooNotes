import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  console.log("Inside middleware---->>>",req.body);
  try {
    let bearerToken = req.header('Authorization');
    console.log("Bearer token---->>>>",bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    console.log("After Split bearerToken" , bearerToken);
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log("User Details After Verification" , user.Email);
    req.body.UserID = user.Email
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
  });
  }
};

export const userAuther  = async (req, res, next) => {
  try {
    let bearertoken = req.params.token;
    console.log("Bearer token---->>>>",bearertoken);
    if (!bearertoken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const user = await jwt.verify(bearertoken, process.env.FORGOT_KEY);
    req.body.EmailID = user.EmailID
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
  });
  }
};
