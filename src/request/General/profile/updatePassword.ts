import { check, body, ValidationChain } from 'express-validator';

export const updatePasswordValidation: ValidationChain[] = [
    check('uuid').notEmpty().withMessage('uuid is required'),
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
];

