import express from 'express';
import ShorthenerController from '../controllers/general/ShorthenerController';

import { updatePasswordValidation } from '../request/General/profile/updatePassword';
import { validate } from '../middleware/ValidatoreMiddleware';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();



router.post('/add.link',authenticateToken, validate(updatePasswordValidation), ShorthenerController.add);
router.put('/update.link',authenticateToken, validate(updatePasswordValidation), ShorthenerController.update);
router.delete('/delete.link',authenticateToken, validate(updatePasswordValidation), ShorthenerController.delete);



export default router;
