import { check, body, ValidationChain } from 'express-validator';

export const addShorthenUrlPublicValidation: ValidationChain[] = [
    check('original_link').notEmpty()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Invalid HTTP/HTTPS URL').withMessage('original link is required'),
    check('link_type').isString().optional({ checkFalsy: true }).escape().isIn(['web', 'mobile']),
    
];

