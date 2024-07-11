// server.js or app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import challengeRoutes from './routes/problemRoutes.js';
import judge0Routes from './routes/judge0Routes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import callbackRoutes from './routes/callbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
// Routes setup
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', challengeRoutes);
app.use('/api/v1', userRoutes);
// app.use('/api/v1/judge0', judge0Routes);
app.use('/api/v1', submissionRoutes);
app.use('/api/v1', callbackRoutes);

export default app;
