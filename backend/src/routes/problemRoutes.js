import express from 'express';
import {
    createChallenge,
    getChallenges,
    getChallengeById,
    updateChallenge,
    deleteChallenge
} from '../controllers/problemController.js';

const router = express.Router();

router.post('/challenges', createChallenge);
router.get('/challenges', getChallenges);
router.get('/challenges/:id', getChallengeById);
router.put('/challenges/:id', updateChallenge);
router.delete('/challenges/:id', deleteChallenge);

export default router;


