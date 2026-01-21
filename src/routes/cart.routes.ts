import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CartController } from '../controllers/cart.controller';

const router = Router();

router.post('/add', authMiddleware, CartController.addToCart);
router.get('/', authMiddleware, CartController.getCart);

export default router;
