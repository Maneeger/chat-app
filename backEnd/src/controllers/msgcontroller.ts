import { Request, Response } from 'express';
import pool from '../models/db';

export const sendMessage = async (req: Request, res: Response) => {
  const { content } = req.body;
  const senderId = (req as any).user.id;
  await pool.query('INSERT INTO messages (sender_id, content) VALUES ($1, $2)', [senderId, content]);
  res.status(201).json({ message: 'Message sent' });
};

export const getMessages = async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT messages.content, messages.sent_at, users.username
    FROM messages
    JOIN users ON messages.sender_id = users.id
    ORDER BY messages.sent_at DESC
    LIMIT 50
  `);
  res.json(result.rows);
};