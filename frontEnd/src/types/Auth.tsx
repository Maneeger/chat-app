// src/types/auth.ts

// Define the shape of a User object (adjust properties as needed)
export interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user-specific properties you expect
}

// Define the shape of the context value that AuthProvider will provide
export interface AuthContextType {
  user: User | null; // user can be a User object or null (if not authenticated)
  login: (userData: User, token: string) => void; // Function to log in
  logout: () => void; // Function to log out
}

// Define the shape of the state object that can be passed via React Router's Navigate component
// This is used for redirecting back to the original page after login.
export interface LocationState {
  from?: {
    pathname: string;
    search: string;
    hash: string;
    key: string;
    state: any; // This could be more specific if you always know the state shape
  };
}