import { Router } from 'express';
//Controller
import { 
    signinHandler, 
    signoutHandler, 
    signupHandler 
} from '../controllers/auth';
//Middlewares
import { 
    signinValidation, 
    sigupValidation 
} from '../middlewares/validation/auth';
import { validateRequest } from '../middlewares/validation/validation';

const router = Router();

router.post('/signup', sigupValidation(), validateRequest, signupHandler);
router.post('/signin', signinValidation(), validateRequest, signinHandler);
router.get('/signout', signoutHandler);

export {router as authRouter};