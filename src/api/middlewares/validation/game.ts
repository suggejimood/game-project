import { body } from 'express-validator';

export const playValidation = () => {
    return[
        body('token').trim().isString(),
        body('score').isNumeric(),
    ];
};
