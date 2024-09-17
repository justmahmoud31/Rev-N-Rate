import brandLocationcontroller from '../Controllers/brandLocationcontroller.js';
import { Router } from 'express';
import authBrand from '../Middlewares/verifybrandTokenMiddleware.js';
const router = Router()
router.post('/addbrandLocation',authBrand,brandLocationcontroller.addLocation);
router.get('/getbrandLocation/:brandId',brandLocationcontroller.getBrandLocation);
router.put('/updatebrandLocation/:brandLocationId',authBrand,brandLocationcontroller.updateLocation);
router.delete('/deletebrandLocation/:brandLocationId',authBrand,brandLocationcontroller.deleteLocation);
export default router;
