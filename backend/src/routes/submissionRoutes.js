import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { createSubmission, deleteSubmission, getSubmission, getSubmissionById, getSubmissionByUserId, getSubmissions, updateSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/submission', authMiddleware, createSubmission);
router.get('/submission/:id', getSubmission);
router.get('/submissions', getSubmissions);
router.get('/submissionbyuserid',authMiddleware, getSubmissionByUserId);
router.get('/submissionbyid/:id', getSubmissionById);
router.put('/submissions/:id', updateSubmissions);
router.delete('/submissions/:id', deleteSubmission);


export default router;
