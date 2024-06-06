import axios from 'axios';
import { JUDGE0_BASE_URL, JUDGE0_API_KEY } from '../config/config.js';

const runCode = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    try {
        const submissionResponse = await axios.post(`${JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true`, {
            source_code,
            language_id,
            stdin
        }, {
            headers: {
                'Content-Type': 'application/json',
                ...(JUDGE0_API_KEY && { 'X-RapidAPI-Key': JUDGE0_API_KEY })
            }
        });

        const submissionResult = submissionResponse.data;
        res.status(200).json(submissionResult);
    } catch (error) {
        console.error('Error running code:', error);
        res.status(500).json({ error: 'Error running code' });
    }
};

export default runCode;