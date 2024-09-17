import { Router } from 'express';
import { registerBrand , loginBrand  } from '../Controllers/brandAuthController.js';

const router = Router();
router.post('/register', registerBrand);
router.post('/login', loginBrand);

export default router;
