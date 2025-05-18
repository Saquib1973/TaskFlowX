import express from 'express';
import { getMe, updateMe, deleteMe } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/me', getMe);
router.patch('/me', updateMe);
router.delete('/me', deleteMe);

export default router;