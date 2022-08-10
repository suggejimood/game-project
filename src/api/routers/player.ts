import { Router } from 'express';
//Controllers
import { 
    playerListHandler, 
    playerRankListHandler, 
    searchPlayerHandler, 
    seeMyProfileHandler, 
    seePlayerProfileHandler, 
    updateProfileHandler 
} from '../controllers/player';
//Middlewares
import { 
    playerListValidator,
    playerProfileValidation, 
    updateProfileValidator 
} from '../middlewares/validation/player';
import { validateRequest } from '../middlewares/validation/validation';
import { authenticationJWT } from '../middlewares/token/token';

const router = Router();

router.use(authenticationJWT);

router.get('/profile', seeMyProfileHandler);
router.post('/profile', playerListValidator(), validateRequest, playerProfileValidation(), validateRequest, seePlayerProfileHandler);
router.post('/player-list', playerListValidator(), validateRequest, playerListHandler);
router.post('/rank-list', playerRankListHandler);
router.post('/search-player', searchPlayerHandler);
router.put('/update-profile', updateProfileValidator(), validateRequest, updateProfileHandler);

export { router as playerRouter };