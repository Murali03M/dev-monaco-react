import express from 'express';
import { registerUser, loginUser, getUserById, updateUser, resetPassword, } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser', authMiddleware, getUserById);
router.patch('/updateuser', authMiddleware, updateUser);
router.patch('/reset-password',resetPassword )
export default router;



