import express from 'express';
import SubCategoryController from '../Controllers/SubCategoryController.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.post('/:categoryId/subcategories/:brandId?',SubCategoryController.AddSubCategory);
router.get('/subcategory/:categoryId', SubCategoryController.getCategorySubCategories);
export default router;
