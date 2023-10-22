import { check, body, ValidationChain } from 'express-validator';
import { Op } from 'sequelize'; 

import User from '../../../models/User';

export const addShorthenUrlValidation: ValidationChain[] = [
    check('uuid').notEmpty().withMessage('uuid is required'),
    check('original_link').isString().optional({ nullable:true,checkFalsy: true }).escape().custom(async (value, { req }) =>{

        const user = await User.getUser({uuid: req.body.uuid, original_link:value});
    
            if (user) {
            throw new Error('You already shorthen this link, please check your dashboard');
            }
            return true;
        }),
    
];

