import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });

  try {
    const token = auth.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};