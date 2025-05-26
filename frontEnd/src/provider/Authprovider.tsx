// src/providers/AuthProvider.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode, // Import ReactNode for children prop type
} from 'react';
import { User, AuthContextType } from '../types/Auth'; // Import your types

// the AuthContext with a default value.
// The default value should match the AuthContextType or be null if no provider exists.
// We assert it as AuthContextType | null for createContext.
const AuthContext = createContext<AuthContextType | null>(null);

// Define props for AuthProvider, specifically for 'children'
interface AuthProviderProps {
  children: ReactNode; // 'children' can be any valid React node
}

// 2. AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 3. user state, explicitly typed as User or null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state for initial check

  // 4. useEffect Hook for Initial Auth Check on App Load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('authToken'); // Get token from localStorage

      if (storedToken) {
        try {
          // --- REAL-WORLD SCENARIO (Uncomment and implement in your actual app) ---
          // You would typically send this storedToken to your backend API
          // to verify its validity and fetch the actual user data.
          // Example:
          // const response = await fetch('/api/verify-token', {
          //   method: 'GET',
          //   headers: {
          //     'Authorization': `Bearer ${storedToken}`,
          //     'Content-Type': 'application/json',
          //   },
          // });
          //
          // if (response.ok) {
          //   const data: User = await response.json(); // Assuming your backend returns User data
          //   setUser(data);
          // } else {
          //   console.error("Token verification failed:", response.statusText);
          //   localStorage.removeItem('authToken'); // Remove invalid token
          //   setUser(null);
          // }
          // --- END REAL-WORLD SCENARIO ---

          // For simplicity in this example, we assume the token is valid
          // and set a dummy user. REPLACE THIS WITH ACTUAL BACKEND CALL.
          setUser({ id: 'dummy-id-123', name: 'Authenticated User', email: 'user@example.com' });

        } catch (error) {
          console.error("Error during initial auth check:", error);
          localStorage.removeItem('authToken'); // Clear any problematic token
          setUser(null);
        }
      }
      setLoading(false); // Set loading to false once check is complete
    };

    checkAuthStatus(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once on mount

  // 5. login function, explicitly typed
  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('authToken', token);
  };

  // 6. logout function, explicitly typed
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  // Provide a loading state for the initial check to prevent flickering or premature redirects
  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner/loader component
  }

  // 7. Render AuthContext.Provider with the value
  // The 'value' prop is explicitly typed as AuthContextType
  const contextValue: AuthContextType = { user, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 8. useAuth Custom Hook for easy consumption
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    // This check is important for TypeScript and runtime safety.
    // It ensures useAuth is only called within an AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};