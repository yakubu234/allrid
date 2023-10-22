import { check, body, ValidationChain } from 'express-validator';
import User from '../../models/User';

// login validation
export const emailOnlyValidation: ValidationChain[] = [
    check('email').notEmpty().isEmail().withMessage('Email is required').custom(async (value) => {
    
        const user = await User.getUser({email:value});
        if (!user) {
          throw new Error('Email not existing in our database');
        }
        return true;
      }),
  
];
