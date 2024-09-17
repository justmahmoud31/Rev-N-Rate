import { Router } from "express";
import {
  getAllOffers,
  getOneOffer,
  addOffer,
  updateOffer,
  deleteOffer,
  getBrandOffers
} from "../Controllers/offerscontroller.js";
import verifyToken from "../Middlewares/verifytokenmiddleware.js";
const router = Router();

router.get("/", verifyToken, getAllOffers);
router.get("/getoneoffer/:offersId", verifyToken, getOneOffer);
router.get("/brandoffers/:brandId",verifyToken,getBrandOffers);
router.post("/addoffer", verifyToken, addOffer);
router.put("/updateoffer/:offersId", verifyToken, updateOffer);
router.delete("/deleteoffer/:offersId", verifyToken, deleteOffer);

export default router;
