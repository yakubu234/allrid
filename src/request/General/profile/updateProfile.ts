import { check, body, ValidationChain } from 'express-validator';
import { Op } from 'sequelize'; 

import User from '../../../models/User';

export const updateProfileValidation: ValidationChain[] = [
    check('uuid').notEmpty().withMessage('uuid is required'),
    check('phone').isString().optional({ nullable:true,checkFalsy: true }).escape().withMessage('Phone is required').custom(async (value, { req }) =>{

      const user = await User.getUser({uuid: {
            [Op.ne]: req.body.uuid, // Not equal to the provided uuid
          }, phone:value});
  
        if (user) {
          throw new Error('Phone already supplied by another user');
        }
        return true;
      }),
    check("first_name").isString().optional({ nullable:true, checkFalsy: true }).escape().withMessage("first name  is required"),
    check("last_name").isString().optional({ nullable:true, checkFalsy: true }).escape().withMessage("last name is required"),
    check("nick_name").isString().optional({ nullable:true, checkFalsy: true }).escape().withMessage("nick name is required").custom(async (value, { req }) =>{
        
      const user = await User.getUser({uuid: {
            [Op.ne]: req.body.uuid, // Not equal to the provided uuid
          }, nick_name:value});
  
          if (user) {
            throw new Error('Nick Name already exists');
          }
          return true;
        }),
    check("address").isString().optional({ checkFalsy: true }).escape(),
    
];

