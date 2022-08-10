import { body } from 'express-validator';

export const getCountryValidation = () => {
    return[
        body('id').trim().notEmpty().isAlphanumeric().withMessage('Enter valid country name.')
    ];
};

export const listCountryValidator = () => {
    return [
        body('filter.*.minPower').trim().isNumeric().withMessage('Pleas enter valid number'),
        body('filter.*.minPower').trim().isNumeric().withMessage('Pleas enter valid number')
    ];
};