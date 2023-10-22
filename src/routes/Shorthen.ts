import express from 'express';
import ShorthenerController from '../controllers/general/ShorthenerController';

import { addShorthenUrlValidation } from '../request/General/shorthen/addShorthenUrlRequest';
import { addShorthenUrlPublicValidation } from '../request/General/shorthen/addShorthenUrlPublicRequest';
import { updateShorthenUrlValidation } from '../request/General/shorthen/updateShorthenUrlRequest';
import { deleteShorthenUrlValidation } from '../request/General/shorthen/deleteShorthenUrlRequest';
import { validate } from '../middleware/ValidatoreMiddleware';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();



router.post('/add.link',authenticateToken, validate(addShorthenUrlValidation), ShorthenerController.add);
router.post('/add.link.public', validate(addShorthenUrlPublicValidation), ShorthenerController.add);
router.put('/update.link',authenticateToken, validate(updateShorthenUrlValidation), ShorthenerController.update);
router.delete('/delete.link',authenticateToken, validate(deleteShorthenUrlValidation), ShorthenerController.delete);



export default router;
