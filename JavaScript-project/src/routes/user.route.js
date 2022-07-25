import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuther } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.UserRegistration);

//route to get a single user by their user id
router.post('/login', userController.UserLogin);

//route to forgot password
router.post('/forgotpassword', userController.forgotPassword);

//route to reset password
router.post('/:token', userAuther , userController.resetPassword)

export default router;
