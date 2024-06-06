import express from 'express';
import runCode from '../controllers/judge0Controller.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure correct path and file name

const router = express.Router();

 router.post('/runcode',authMiddleware, runCode); 

export default router;
