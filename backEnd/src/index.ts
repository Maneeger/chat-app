import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './models/db';

// Import your authentication controller functions (Signup, login)
// They should be exported from controllers/authController.ts
import { Signup, login } from './controllers/authcontroller';

// Import your main router for API endpoints.
// We'll assume './routes/authRoutes' is where your main API router (e.g., auth routes) is defined.
// Let's name it 'apiRouter' to be clear it's the root of your API paths.
import apiRouter from './routes/authRoutes'; // Renamed from 'mainRouter' for clarity

dotenv.config(); // Load environment variables first

const app = express();

// --- Middleware Setup (Order matters!) ---

// 1. CORS Configuration (ONLY ONCE, and with specific settings)
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'], // Add PATCH if you use it
  allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true, 
}));

// 2. Body Parser Middleware (MUST be before any routes that read req.body)
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (e.g., from HTML forms)

// --- API Route Mounting ---

// Mount your main API router at the '/api' base path.
// All routes defined inside 'apiRouter' will now be prefixed with '/api'.
app.use('/api', apiRouter);
app.post('/signup', Signup);
app.post('/login', login);

// --- General Routes (if any, outside of /api) ---

// A simple root route for the server itself (e.g., for health check)
app.get('/', (req: Request, res: Response) => {
  console.log("Root route hit!");
  res.status(200).send('<h1>Welcome to your backend API!</h1><p>Navigate to /api for API endpoints.</p>');
});

// --- IMPORTANT: Remove these if signup/login are defined INSIDE apiRouter/authRoutes ---
// If these are meant to be standalone routes at the root level, then define them here.
// But typically, they belong within an API router.
// If your signup/login are POST methods, these should be POST.
// app.post('/signup', Signup);
// app.post('/login', login);


// --- Error Handling Middleware (ALWAYS LAST) ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the full error stack for debugging
  if (!res.headersSent) {
    // You can customize the status code and message based on the error type
    // For now, a generic 500 is fine, but you might want to differentiate later
    res.status(500).send('Something broke on the server!');
  }
  
});

// --- Server Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () =>  {
  console.log(`Backend server running on port ${PORT}`);
  // database  connection check
   try {
    const client = await pool.connect(); // Attempt to acquire a client from the pool
    await client.query('SELECT 1'); // Run a simple dummy query (e.g., SELECT 1)
    client.release(); // Release the client back to the pool

    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection FAILED!', err);
    // Optionally exit the process if DB connection is critical for startup
    // process.exit(1);
  }

});
//db check
