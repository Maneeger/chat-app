
import { Router, Request, Response, NextFunction } from 'express'; // Import types from 'express'
import { Signup, login } from '../controllers/authcontroller';

const router = Router();

router.post('/api/signup', Signup);
router.post('/api/login', login);

export default router;










