import { check, body, ValidationChain } from 'express-validator';
import { Op } from 'sequelize'; 

import ShorthendLink from '../../../models/ShorthendLink';

export const addShorthenUrlValidation: ValidationChain[] = [
    check('uuid').notEmpty().withMessage('uuid is required'),
    check('original_link').notEmpty()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Invalid HTTP/HTTPS URL').withMessage('original link is required').custom(async (value, { req }) =>{

        const user = await ShorthendLink.get({user_id: req.body.uuid, original_link:value});
    
            if (user) {
            throw new Error('You already shorthen this link, please check your dashboard');
            }
            return true;
        }),
    check('redirect_link').optional({ nullable:true,checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Invalid HTTP/HTTPS URL').custom(async (value, { req }) =>{

        const user = await ShorthendLink.get({user_id: req.body.uuid, redirect_link:value});
    
          if (user) {
            throw new Error('The redirect url already exist, please check your dashboard');
          }
          return true;
        }),

    check('short_link').isString().optional({ nullable:true,checkFalsy: true }).escape().custom(async (value, { req }) =>{

        const user = await ShorthendLink.get({short_link:value});
        
            if (user) {
                throw new Error('The customized short link supplied already exist, please check your dashboard');
            }
            return true;
        }),

    check('link_type').isString().optional({ checkFalsy: true }).escape().isIn(['web', 'mobile']),
    check("link_expiry").isString().optional({ nullable:true, checkFalsy: true }).escape(),
    
];

