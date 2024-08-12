import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    


    if (!decoded.userId) {
      return res.status(401).json({ error: 'Token does not contain userId' });
    }

  
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
