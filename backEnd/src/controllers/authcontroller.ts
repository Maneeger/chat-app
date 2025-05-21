import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hash]);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'User already exists or error occurred' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) { res.status(401).json({ error: 'Invalid credentials' })}
    return;

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {res.status(401).json({ error: 'Invalid credentials' })}
    return
    ;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};