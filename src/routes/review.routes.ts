import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createReview, getProductReviews } from '../controllers/review.controller';

const router = Router();

router.post('/', authMiddleware, createReview);
router.get('/product/:productId', getProductReviews);

export default router;
