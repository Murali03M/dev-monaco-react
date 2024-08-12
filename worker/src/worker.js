// src/worker.js
import { createClient } from 'redis';
import axios from 'axios';
import prisma from './prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0.chetechs.com/';
const CALLBACK_URL = process.env.JUDGE0_CALLBACK_URL || 'https://backenddev.chetechs.com/api/v1/submission-callback';
;

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
    const { submissionId, code, language, inputs, outputs } = submissionData;
   
    try {
      const languageId = LANGUAGE_MAPPING[language];
      if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);

      }
 

  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    {
      submissions: inputs.map((input, index) => ({
        language_id: languageId,
        source_code: code,
        stdin: input,
        expected_output: outputs[index],
        callback_url:CALLBACK_URL
      })),
    },
  );
      const tokens = response.data.map(res => res.token);
      await Promise.all(
        tokens.map((token, index) => 
          prisma.testCase.updateMany({
            where: { submissionId, index },
            data: { judge0TrackingId: token }
          })
        )
      );

      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'PENDING' }
      });

      console.log(`Submission ${submissionId} processed successfully`);
    } catch (error) {
      console.error('Error processing submission:', error);

      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'REJECTED' }
      });
    }
  });
};

main().catch((err) => {
  console.error('Error starting worker:', err);
});
