
import prisma from '../../prisma/prismaClient.js';
import { z } from 'zod';

// Define the structure of the expected callback data
const SubmissionCallback = z.object({
  token: z.string(),
  status: z.object({
    description: z.string(),
  }),
  time: z.string() || null,
  memory: z.number() || null,
  stderr: z.string().optional() || null,
});

const outputMapping = {
  'Accepted': 'AC',
  'Wrong Answer': 'FAIL',
  'Time Limit Exceeded': 'TLE',
  'Compilation Error': 'COMPILATION_ERROR',
  'Runtime Error (NZEC)': 'COMPILATION_ERROR',
};

export const submissionCallback = async (req, res) => {


  try {
    const { token, status, time, memory } = req.body;
    if (!token || !status || !status.description) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const testCase = await prisma.testCase.update({
      where: { judge0TrackingId: token },
      data: {
        status: outputMapping[status.description] || 'PENDING',
        time: Number(time),
        memory,
      },
    });

  
    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    const allTestCases = await prisma.testCase.findMany({
      where: { submissionId: testCase.submissionId },
    });

    const pendingTestCases = allTestCases.filter(tc => tc.status === 'PENDING');
    const failedTestCases = allTestCases.filter(tc => tc.status !== 'AC');

    if (pendingTestCases.length === 0) {
      const accepted = failedTestCases.length === 0;
      await prisma.submission.update({
        where: { id: testCase.submissionId },
        data: {
          status: accepted ? 'AC' : 'REJECTED',
          time: Math.max(...allTestCases.map(tc => tc.time || 0)),
          memory: Math.max(...allTestCases.map(tc => tc.memory || 0)),
        },
      });
    }

    res.send('Received');
  } catch (error) {
    console.error('Error updating test case:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
