import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';

import { getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/user',authMiddleware,getUserById);


export default router;
