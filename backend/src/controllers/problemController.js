import prisma from '../../prisma/prismaClient.js';
import fs from "fs"
import { ObjectId } from "mongodb";
import path from "path"
import { fileURLToPath } from 'url';


const LANGUAGE_MAPPING = {
    js: { judge0: 63, name: "Javascript" },
    cpp: { judge0: 54, name: "C++",},
    rs: { judge0: 73, name: "Rust" },
  };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOUNT_PATH = path.join(__dirname, '../../../problems')
  
  function promisifedReadFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err, data) => {
        if (err) { 
          reject(err);
        }
        resolve(data);
      });
    });
  }
  

export const createChallenge = async (req, res) => {
    try {
        const { problemSlug, problemTitle, difficulty } = req.body;
    
        const problemStatement = await promisifedReadFile(
          `${MOUNT_PATH}/${problemSlug}/Problem.md`
        );
    
        const problem = await prisma.problem.upsert({
          where: {
            slug: problemSlug,
          },
          create: {
            title: problemTitle,
            slug: problemSlug,
            description: problemStatement,
            difficulty:difficulty
          },
          update: {
            description: problemStatement,
          },
        });
    
        
  await Promise.all(
    Object.keys(LANGUAGE_MAPPING).map(async (language) => {
        console.log(LANGUAGE_MAPPING[language].name);
        const languageInfo = await prisma.language.findFirst({
            where: {
              
              name: LANGUAGE_MAPPING[language].name,
            }     
        })

        console.log(languageInfo);

    const code = await promisifedReadFile(
      `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
    );
    await prisma.defaultCode.upsert({
      where: {
        problemId_languageId: {
          problemId: problem.id,
          languageId: languageInfo.name,
        },
      },
      create: {
        problemId: problem.id,
        languageId: languageInfo.name,
        code,
      },
      update: {
        code,
      },
    });
  })
);
    
        res.status(200).json({ message: 'Database seeded successfully' });
      } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ error: 'Failed to seed database' });
      }
    
};

// Get all challenges
export const getChallenges = async (req, res) => {
  try {
      const problems = await prisma.problem.findMany();
      res.status(200).json(problems);
  } catch (error) {
      console.error('Error retrieving challenges:', error);
      res.status(500).json({ error: 'Error retrieving challenges' });
  }
};

// Get a challenge by ID
export const getChallengeById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const challenge = await prisma.problem.findUnique({
      where: {
        id: new ObjectId(String(id))
        
      },
      include: { defaultCode: true }
    });
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
