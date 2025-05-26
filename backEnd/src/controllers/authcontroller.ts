import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';

// json-web-token function load
import dotenv from 'dotenv';

dotenv.config();


 
function generateToken(payload: object): string {
  // 1. Get the secret from environment variables.
  //    It's crucial to handle the case where it might be undefined.
  const jwtSecret = process.env.JWT_SECRET;

  // 2. Validate that the secret is actually defined.
  if (!jwtSecret) {
    // Log an error and throw, as the server cannot function securely without this.
    console.error('CRITICAL ERROR: JWT_SECRET environment variable is not defined.');
    throw new Error('Server configuration error: JWT secret is missing.');
  }

  // 3. Get the expiry from environment variables, with a default.
  //    process.env.JWT_EXPIRES_IN will be 'string | undefined'.
  //    The || '1h' correctly provides a default string.


  // 4. Sign the token with the correct types.
  //    TypeScript now knows jwtSecret is a string.
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

// Example usage (assuming you have a payload object)
// const myPayload = { userId: '123', role: 'admin' };
// try {
//   const token = generateToken(myPayload);
//   console.log('Generated Token:', token);
// } catch (error) {
//   console.error(error.message);
// }

export const Signup = async (req: Request, res: Response): Promise<void> => {
  interface SignupRequestBody {
  username?: string | Date; // Optional if you want to allow it
  email: string;
  password: string;
}
  const { username, email,password } = req.body as SignupRequestBody;
  console.log("Received request body:", req.body);  // Logs entire request body
console.log("Extracted username:", username);  
  try {
    console.log("active")
    const hash = await bcrypt.hash(password, 10);
    //to check already existing user
     const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
console.log(userCheck)
    if (userCheck.rows.length > 0) {
       res.status(409).json({ message: 'User already exists.' });
    }
    //creating new user
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, hash]
    );
        const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ message: 'User registered',token:token });
   return

    
  } catch (err) {
     console.error("Error during signup:", err);
   res.status(500).json({ error: 'internal server error' });
   return

  }
};

// login comes after

export const login = async (req: Request, res: Response): Promise<void> => {
  interface LoginRequestBody {
  username: string;
  password: string;
}
  const { username, password } = req.body as LoginRequestBody;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    if (result.rows.length === 0) { res.status(401).json({ error: 'Invalid credentials' })}
 

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {res.status(401).json({ error: 'Invalid credentials' })
   return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
   return

  }
};