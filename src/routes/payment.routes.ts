import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();

router.post('/create', authMiddleware, PaymentController.createPayment);
router.post('/confirm', authMiddleware, PaymentController.confirmPayment);

export default router;
