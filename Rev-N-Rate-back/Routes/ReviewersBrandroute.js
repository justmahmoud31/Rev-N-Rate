import { Router } from "express";
import ReviewersBRandController from '../Controllers/ReviewersBRandController.js';
import verifyToken from '../Middlewares/verifytokenmiddleware.js';
const router = Router();
router.post('/addFavBrand/:brandId',verifyToken,ReviewersBRandController.addFavBrand);
router.get('/getFavbrands/:reviewerId',verifyToken,ReviewersBRandController.getFavBrands);
router.delete('/deleteFavBrand/:savedID',verifyToken,ReviewersBRandController.deleteFavBrand);
export default router;