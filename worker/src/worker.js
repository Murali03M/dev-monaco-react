// src/worker.js
import { createClient } from 'redis';
import axios from 'axios';
import prisma from './prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
// const JUDGE0_API_URL = 'http://judge0.chetechs.com/submissions';

const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const LANGUAGE_MAPPING = {
  js: 63,
  cpp: 54,
  rs: 73,
};

const main = async () => {
      await redisClient.connect();

  console.log('Worker started, waiting for tasks...');

  redisClient.subscribe('submissions', async (message) => {
      const submissionData = JSON.parse(message);
      
      console.log(submissionData);
      const { submissionId, code, language } = submissionData;
      

    try {
      const languageId = LANGUAGE_MAPPING[language];
      if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);
      }

    //   const response = await axios.post(
    //     `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
    //     {
    //       source_code: code,
    //       language_id: languageId,
    //       stdin: '',
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
        //   );
        


        // const result = response.data;
        


    //   await prisma.submission.update({
    //     where: { id: submissionId },
    //     data: {
    //       status: 'COMPLETED',
    //       result: JSON.stringify(result),
    //     },
    //   });

      console.log(`Submission ${submissionId} processed successfully`);
    } catch (error) {
      console.error('Error processing submission:', error);
    //   await prisma.submission.update({
    //     where: { id: submissionId },
    //     data: {
    //       status: 'FAILED',
    //       error: error.message,
    //     },
    //   });
    }
  });
};

main().catch((err) => {
  console.error('Error starting worker:', err);
});
