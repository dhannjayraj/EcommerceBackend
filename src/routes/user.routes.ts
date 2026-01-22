import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getProfile, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.get('/', authMiddleware, getAllUsers);

export default router;
