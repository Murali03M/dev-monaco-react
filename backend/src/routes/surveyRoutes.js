import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { submitSurvey } from '../controllers/surveyController.js';


const router = express.Router();

router.post('/survey',authMiddleware,submitSurvey);


export default router;
