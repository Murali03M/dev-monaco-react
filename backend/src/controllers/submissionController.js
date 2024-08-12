import prisma from '../../prisma/prismaClient.js';
import fs from "fs"
import getProblemDetails from '../utils/problems.js';
import { createClient } from 'redis';
import { time } from 'console';

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
await redisClient.connect();


const LANGUAGE_MAPPING = {
    js: { judge0: 63, name: "Javascript" },
    cpp: { judge0: 54, name: "C++",},
    rs: { judge0: 73, name: "Rust" },
  };
  
const MOUNT_PATH = "../problems";
  
  
export  const createSubmission = async (req, res) => {
    try {
     
      const { problemId, language, code,timeSpent } = req.body;
     
      const userId = req.userId;
  
      const dbProblem = await prisma.problem.findUnique({
        where: {
          id: problemId
        }
      });
  
      if (!dbProblem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
  
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
          timeSpent: timeSpent
        }
      });
        
        await prisma.testCase.createMany({
            data: problem.inputs.map((input, index)=> ({
                submissionId: submission.id,
                status: "PENDING",
                index,
                judge0TrackingId: ''
     
            }))
      })
  
      // Publish the submission to Redis
      await redisClient.publish('submissions', JSON.stringify({
        submissionId: submission.id,
        code: problem.fullBoilerplateCode,
        language: language,
        inputs: problem.inputs,
        outputs: problem.outputs
        
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

export const getSubmissionByUserId = async (req, res) => {
  const userId =req.userId

  try {
      const submission = await prisma.submission.findMany({
          where: { userId: userId },
          
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
// Get a submissions by submission id 
export const getSubmission = async (req, res) => {
  const { id } = req.params;
  console.log(`Received request for submission with id: ${id}`);

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: String(id) },
      include:{ testcases:true}
    });

    if (!submission) {
      return res.status(404).json("No submission found");
    }
  console.log("mndbfhksdjbs jshdfvfdhjsfvjsd",submission);
    res.status(200).json(submission);
  } catch (error) {
    console.error('Error retrieving challenge:', error);
    res.status(500).json({ error: 'Error retrieving challenge' });
  }
};


// Update a challenge
export const updateSubmissions = async (req, res) => {
  const { id } = req.params;
  const { testCases, memory, time, accuracy } = req.body;

  try {
    // Create an object with only the fields that are provided
    const updateData = {};

    if (testCases !== undefined) updateData.testCases = testCases;
    if (memory !== undefined) updateData.memory = memory;
    if (time !== undefined) updateData.time = time;
    if (accuracy !== undefined) updateData.accuracy = accuracy;

    const challenge = await prisma.submission.update({
      where: { id: String(id) },
      data: updateData,
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
