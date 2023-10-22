import express from 'express';
import UserController from '../controllers/profile/UserController';

import { updateProfileValidation } from '../request/General/profile/updateProfile';
import { updatePasswordValidation } from '../request/General/profile/updatePassword';
import { validate } from '../middleware/ValidatoreMiddleware';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.put('/update.profile',authenticateToken, validate(updateProfileValidation),  UserController.updateProfile);
router.put('/update.password',authenticateToken, validate(updatePasswordValidation), UserController.updatePassword);

export default router;
