import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';


export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(4).required(),
    LastName: Joi.string().min(4).required(),
    EmailID: Joi.string().email().required(),
    Password: Joi.string().min(8).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
    next(error);
  } else {
    next();
  }
};
