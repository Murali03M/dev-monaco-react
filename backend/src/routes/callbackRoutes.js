import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { submissionCallback } from '../controllers/callbackController.js';

const router = express.Router();

router.put('/submission-callback',submissionCallback);


export default router;
