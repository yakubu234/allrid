import { check, body, ValidationChain } from 'express-validator';

import User from '../../models/User';

// user registration validation
export const registerValidation: ValidationChain[] = [

    check('email').notEmpty().withMessage('Email is required').custom(async (value) => {
      const user = await User.getUser({email:value});

        if (user) {
          throw new Error('Email already exists');
        }
        return true;
      }),
      check('phone').notEmpty().withMessage('Phone is required').custom(async (value) => {
        const user = await User.getUser({phone: value});
        
        if (user) {
          throw new Error('Phone already exists');
        }
        return true;
      }),
    check("password", "Password fiel is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("your password should have minimum of 8 characters")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
    check("confirm_password", "Passwords do not match").custom(
        (value, { req }) => value === req.body.password
    ),
    check("first_name").not().isEmpty().trim().escape().withMessage("first name  is required"),
    check("last_name").not().isEmpty().trim().escape().withMessage("last name year is required"),
    check("nick_name").isEmpty().optional({ checkFalsy: true }).escape().withMessage("nick name is required"),
    check("address").not().isEmpty().trim().escape().withMessage("Address is required")
];

