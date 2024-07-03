import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { createSubmission, deleteSubmission, getSubmissionById, getSubmissions, updateSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/submission',authMiddleware,createSubmission);
router.get('/submission', getSubmissions);
router.get('/submission/:id', getSubmissionById);
router.put('/submissions/:id', updateSubmissions);
router.delete('/submissions/:id', deleteSubmission);

export default router;
