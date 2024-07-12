import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';


export const registerUser = async (req, res) => {

  const { email, password, name, skillLevel, interests } = req.body;


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      skillLevel,
      interests,
    },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(201).send({ user, token,expiresIn:process.env.JWT_EXPIRATION_SECONDS });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ user, token,expiresIn:process.env.JWT_EXPIRATION_SECONDS });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


export const getUserById = async (req, res) => {
   const userId = req.userId

    try {
        const user = await prisma.user.findUnique({
          where: { id:userId },
          include:{ submissions:true}
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Error getting user by ID' });
    }
};






