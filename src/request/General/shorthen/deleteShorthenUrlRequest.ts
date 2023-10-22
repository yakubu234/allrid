import { check, body, ValidationChain } from 'express-validator';
import { Op } from 'sequelize'; 

import User from '../../../models/User';

export const deleteShorthenUrlValidation: ValidationChain[] = [
    check('uuid').notEmpty().withMessage('uuid is required'),
    check('original_link').isString().optional({ nullable:true,checkFalsy: true }).escape().custom(async (value, { req }) =>{

        const user = await User.getUser({uuid: req.body.uuid, original_link:value});
    
            if (user) {
            throw new Error('You already shorthen this link, please check your dashboard');
            }
            return true;
        }),
    check('redirect_link').isString().optional({ nullable:true,checkFalsy: true }).escape().custom(async (value, { req }) =>{

        const user = await User.getUser({uuid: req.body.uuid, redirect_link:value});
    
          if (user) {
            throw new Error('The redirect url already exist, please check your dashboard');
          }
          return true;
        }),

    check('short_link').isString().optional({ nullable:true,checkFalsy: true }).escape().custom(async (value, { req }) =>{

        const user = await User.getUser({short_link:value});
        
            if (user) {
                throw new Error('The customized short link supplied already exist, please check your dashboard');
            }
            return true;
        }),

    check('link_type').isString().optional({ checkFalsy: true }).escape().isIn(['web', 'mobile']),
    check("link_expiry").isString().optional({ nullable:true, checkFalsy: true }).escape(),
    
];

