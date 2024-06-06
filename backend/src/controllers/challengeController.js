import prisma from '../../prisma/prismaClient.js';

export const createChallenge = async (req, res) => {
  const { title, description, category, tags, testCases } = req.body;

  try {
      const challenge = await prisma.challenge.create({
          data: {
              title,
              description,
              category,
              tags,
              testCases: {
                  create: testCases,
              },
          },
      });

      res.status(201).json(challenge);
  } catch (error) {
      console.error('Error creating challenge:', error);
      res.status(500).json({ error: 'Error creating challenge' });
  }
};

// Get all challenges
export const getChallenges = async (req, res) => {
  try {
      const challenges = await prisma.challenge.findMany();
      res.status(200).json(challenges);
  } catch (error) {
      console.error('Error retrieving challenges:', error);
      res.status(500).json({ error: 'Error retrieving challenges' });
  }
};

// Get a challenge by ID
export const getChallengeById = async (req, res) => {
  const { id } = req.params;

  try {
      const challenge = await prisma.challenge.findUnique({ where: { id: String(id) } });
      if (!challenge) {
          return res.status(404).json({ error: 'Challenge not found' });
      }

      res.status(200).json(challenge);
  } catch (error) {
      console.error('Error retrieving challenge:', error);
      res.status(500).json({ error: 'Error retrieving challenge' });
  }
};

// Update a challenge
export const updateChallenge = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, tags, testCases } = req.body;

  try {
      const challenge = await prisma.challenge.update({
          where: { id: String(id) },
          data: {
              title,
              description,
              category,
              tags,
              testCases: {
                  deleteMany: {},
                  create: testCases,
              },
          },
      });

      res.status(200).json(challenge);
  } catch (error) {
      console.error('Error updating challenge:', error);
      res.status(500).json({ error: 'Error updating challenge' });
  }
};

// Delete a challenge
export const deleteChallenge = async (req, res) => {
  const { id } = req.params;

  try {
      await prisma.challenge.delete({ where: { id: String(id) } });
      res.status(200).json({ message: 'Challenge deleted' });
  } catch (error) {
      console.error('Error deleting challenge:', error);
      res.status(500).json({ error: 'Error deleting challenge' });
  }
};
