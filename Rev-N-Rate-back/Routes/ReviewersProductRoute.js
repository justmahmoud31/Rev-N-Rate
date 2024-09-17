import verifyToken from '../Middlewares/verifytokenmiddleware.js';
import { Router } from "express";
import ReviewersProductController from '../Controllers/ReviewersProductController.js';
const router = Router();
router.post('/addFavProduct/:productId',verifyToken,ReviewersProductController.AddFavProduct);
router.get('/getAllFavProducts/:reviewerId',verifyToken,ReviewersProductController.getAllFavProducts);
router.delete('/deleteFavProduct/:savedID',verifyToken,ReviewersProductController.deleteFavProduct);
export default router;