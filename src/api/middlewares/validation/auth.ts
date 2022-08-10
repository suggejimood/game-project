import { body, check } from "express-validator"
//Model
import { PlayerModel } from "../../models/player";
//Errors
import { AlreadyExistError } from "../../../submodules/core/errors/already-exist";
import { BadRequestError } from "../../../submodules/core/errors/bad-request";


export const sigupValidation = () => {
    return[
        body('nickname').trim().notEmpty().withMessage('Nickname can not be empty').isLength({min: 3, max: 30}).withMessage('Nickname must be between 3 and 30 characters.').custom(async (nickname)=>{
            const existingNickname = await PlayerModel.findOne({nickname: nickname});
            if(existingNickname){
                throw new AlreadyExistError('This nickname is taken. Pleas try new one.');
            }
        }),
        body('aboutMe').optional().trim().isString().isLength({max: 150}).withMessage('About me must be max 150 character.'),
        body('nameSurname').trim().notEmpty().withMessage('Name and Surname can not be empty').isLength({min: 3, max: 30}).withMessage('Name and Surname must be between, 2 an 70 characters.'),
        body('email').trim().notEmpty().withMessage('Email can not be empty').isEmail().withMessage('Pleas enter valid e-mail.').custom(async (email) => {
            const existingEmail = await PlayerModel.findOne({email: email});
            if(existingEmail){
                throw new AlreadyExistError('This email already exists.');
            }
        }),
        body('password').trim().isString().notEmpty().withMessage('Password can not be empty').isLength({min: 6, max: 20}).withMessage('Password must be between 6 and 20 characters.'),
        body('repassword').trim().isString().notEmpty().withMessage('Repassword can not be empty').custom(async (repassword, {req}) => {
            if(repassword != req.body.password){
                throw new BadRequestError('Passwords must be same.');
            }
        }),
        body('country').trim().notEmpty()
    ]
};

export const signinValidation = () => {
    return [
        body('email').trim().isEmail().withMessage('Pleas enter valid e-mail.'),
        body('password').trim().isLength({min: 6, max: 20}),
        body('close').isBoolean()
    ];
};