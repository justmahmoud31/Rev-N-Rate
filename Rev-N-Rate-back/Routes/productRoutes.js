import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  addLike,
  addDisLike,
  getProductRate,
  getBrandProducts
} from "../Controllers/productcontroller.js";
import verifyToken from "../Middlewares/verifytokenmiddleware.js";
const router = Router();
router.get("/", getAllProducts);
router.get("/getoneproduct/:productId", getOneProduct);
router.get("/productrate/:productId", getProductRate);
router.get("/brandproducts/:brandId",getBrandProducts);
router.post("/addproduct", verifyToken, addProduct);
router.post("/addlike/:productId", verifyToken, addLike);
router.post("/adddislike/:productId", verifyToken, addDisLike);
router.put("/updateproduct/:productId", verifyToken, updateProduct);
router.delete("/deleteproduct/:productId", verifyToken, deleteProduct);
export default router;
