import express, {  Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';


dotenv.config();

const app = express();
// mddleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);


// --- Basic Error Handling Middleware ---
// This should be the last middleware added
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
