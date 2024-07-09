import prisma from '../../prisma/prismaClient.js';
import fs from "fs"
import getProblemDetails from '../utils/problems.js';
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
await redisClient.connect();


const LANGUAGE_MAPPING = {
    js: { judge0: 63, name: "Javascript" },
    cpp: { judge0: 54, name: "C++",},
    rs: { judge0: 73, name: "Rust" },
  };
  
const MOUNT_PATH = "../problems";
  
  
export const createSubmission = async (req, res) => {
    try {
      console.log(req.body);
      const { problemId, language, code } = req.body;
      console.log("language in submission", language);
      const userId = req.userId;
  
      const dbProblem = await prisma.problem.findUnique({
        where: {
          id: problemId
        }
      });
  
      if (!dbProblem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
  
      console.log("Calling getProblemDetails with slug:", dbProblem.slug, "and languageId:", language);
      const problem = await getProblemDetails({ slug: dbProblem.slug, languageId: language });
  
      problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
        "##USER_CODE_HERE##",
        code
      );
  
      const submission = await prisma.submission.create({
        data: {
          userId: userId,
          problemId: problemId,
          languageId: language,
          code: code,
          fullCode: problem.fullBoilerplateCode,
          status: "PENDING",
        }
      });
  
      // Publish the submission to Redis
      await redisClient.publish('submissions', JSON.stringify({
        submissionId: submission.id,
        code: code,
        language: language,
      }));
  
      res.status(200).json({ message: 'Submission created successfully', submission });
    } catch (error) {
      console.error("Error while submitting:", error);
      res.status(500).json({ error: 'An error occurred while creating the submission' });
    }
  };
  


// Get all challenges
export const getSubmissions = async (req, res) => {
  try {
      const submissions = await prisma.submission.findMany();
      res.status(200).json(submissions);
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving submission' });
  }
};

// Get a submissions by ID(problem id )
export const getSubmissionById = async (req, res) => {
  const { id } = req.params;

  try {
      const submission = await prisma.submission.findMany({
          where: { problemId: String(id) },
          
      });
      if (!submission) {
          return res.status(404).json({ message: 'No submission found' });
      }

      res.status(200).json(submission);
  } catch (error) {
      console.error('Error retrieving challenge:', error);
      res.status(500).json({ error: 'Error retrieving challenge' });
  }
};

// Update a challenge
export const updateSubmissions= async (req, res) => {
  const { id } = req.params;
  const {  testCases,memory,time, } = req.body;

  try {
      const challenge = await prisma.submission.update({
          where: { id: String(id) },
          data: {
              testCases,
              memory,
              time,

          },
      });

      res.status(200).json(challenge);
  } catch (error) {
      console.error('Error updating challenge:', error);
      res.status(500).json({ error: 'Error updating challenge' });
  }
};

// Delete a submission
export const deleteSubmission = async (req, res) => {
  const { id } = req.params;

  try {
      await prisma.submission.delete({ where: { id: String(id) } });
      res.status(200).json({ message: 'Challenge deleted' });
  } catch (error) {
      console.error('Error deleting challenge:', error);
      res.status(500).json({ error: 'Error deleting challenge' });
  }
};
