import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import  authRoutes  from './routes/authRoutes.js';
import challengeRoutes from './routes/problemRoutes.js';
import judge0Routes from './routes/judge0Routes.js'
import submissionRoutes from './routes/submissionRoutes.js'

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', challengeRoutes);
app.use('/api/v1/judge0', judge0Routes);
app.use('/api/v1/', submissionRoutes)

export default app;
