import ReviewController from '../Controllers/ReviewController.js';
import verifyToken from "../Middlewares/verifytokenmiddleware.js";
import { Router } from 'express';
import multer from 'multer'; 

const router = Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/addbrandreview/:brandId', verifyToken, upload.single('photos'), ReviewController.addBrandReview);

router.post('/addproductreview/:productId', verifyToken, ReviewController.addProductReview);
router.post('/addlike/:reviewId', verifyToken, ReviewController.addLike);
router.post('/adddislike/:reviewId', verifyToken, ReviewController.addDislike);
router.patch('/editreview/:reviewId', verifyToken, ReviewController.EditBrandReview);
router.get('/brandReviews/:brandId', verifyToken, ReviewController.getBrandreviews);
router.get('/productreviews/:productId', verifyToken, ReviewController.getProductReviews);
router.get('/popularreviews', verifyToken, ReviewController.getPopularReviews);
router.get('/getreviewrate/:reviewId', verifyToken, ReviewController.getReviewRate);
router.delete('/deletereview/:reviewId', verifyToken, ReviewController.deleteReview);

export default router;
