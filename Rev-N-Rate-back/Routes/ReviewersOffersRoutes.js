import verifyToken from '../Middlewares/verifytokenmiddleware.js';
import { Router } from 'express';
import ReviewerOffersControllers from '../Controllers/ReviewerOffersControllers.js';
const router = Router();
router.post('/addFavOffer/:offersId',verifyToken,ReviewerOffersControllers.addFavOffer);
router.get('/getFavOffers/:reviewerId',verifyToken,ReviewerOffersControllers.getFavOffers);
router.delete('/deleteFavoffer/:savedId',verifyToken,ReviewerOffersControllers.deleteFavOffers);
export default router;