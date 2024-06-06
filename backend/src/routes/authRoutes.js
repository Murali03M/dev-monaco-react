import express from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', authMiddleware, getUserById);

export default router;
