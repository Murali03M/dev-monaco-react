import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(401).json({ error: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
          return res.status(401).json({ error: 'User not found' });
      }

      req.user = user;
      next();
  } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
  }

};

export default authMiddleware;
