import express from 'express';
import AuthController from '../controllers/auth/AuthController';

import { registerValidation } from '../request/Auth/register';
import { loginValidation } from '../request/Auth/login';
import { emailOnlyValidation } from '../request/General/emailOnly';
import { validate } from '../middleware/ValidatoreMiddleware';

const router = express.Router();

router.post('/register',validate(registerValidation),  AuthController.register);
router.post('/login',validate(loginValidation), AuthController.login);
router.post('/forgot.password',validate(emailOnlyValidation), AuthController.forgotPassword);
router.put('/reset.password',validate(loginValidation), AuthController.login);

export default router;
