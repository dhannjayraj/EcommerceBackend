import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { OrderController } from '../controllers/order.controller';

const router = Router();

router.post('/place', authMiddleware, OrderController.placeOrder);
router.get('/my', authMiddleware, OrderController.myOrders);

export default router;
