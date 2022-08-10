import { body } from 'express-validator';

export const playerProfileValidation = () => {
    return [
        body('id').trim().notEmpty()
    ];
};

export const playerListValidator = () => {
    return [
        body('filter.*.country').trim().isString(),
        body('filter.*.rank').isNumeric().withMessage('Pleas enter valid number.')
    ];
};

export const updateProfileValidator = () => {
    return [
        body('token').notEmpty(),
        body('nameSurname').trim().isString().isLength({min: 3, max: 30}).withMessage('Name and Surname must be between, 2 an 70 characters.'),
        body('country').trim().isString().withMessage('Country must be string.'),
        body('aboutMe').trim().isString().withMessage('About me must be string.'),
        body('settings.*.showEmail').isBoolean(),
        body('settings.*.showNameSurname').isBoolean()
    ];
};