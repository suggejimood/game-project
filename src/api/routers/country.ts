import { Router } from 'express';
//Controller
import { 
    getCountryHandler, 
    listCountryHandler 
} from '../controllers/country';
//Middlewares
import { listCountryValidator } from '../middlewares/validation/country';
import { validateRequest } from '../middlewares/validation/validation';
import { authenticationJWT } from '../middlewares/token/token';

const router = Router();

router.use(authenticationJWT);

router.post('/country', getCountryHandler);
router.post('/list-country',listCountryValidator(), validateRequest, listCountryHandler);

export {router as countryRouter};