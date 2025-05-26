// src/components/Auth/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useChatContext } from '../../provider/ChatContext'; // Adjust path as needed

// 1. Define the type for the ChatContext state
//    You should replace this with the actual type definition from your ChatContext.
//    For example, if your ChatContext provides an object with `isAuthenticated` and `theme`:
interface ChatContextStateType {
  isAuthenticated: boolean;
  theme: 'light' | 'dark'; // Add other state properties from your context as needed
  // ... any other properties in your chat context state
}

// 2. Define the type for the ChatContext itself
//    This should match the type you define in your ChatContext file (e.g., in ChatContext.ts)
//    It should include the `state` and `dispatch` properties.
interface ChatContextType {
  state: ChatContextStateType;
  // If you have a dispatch function, its type would be something like:
  // dispatch: React.Dispatch<any>; // Replace 'any' with your specific action type
  // ... other properties or functions provided by your context
}

// 3. Define the props type for ProtectedRoute
interface ProtectedRouteProps {
  children?: ReactNode; // 'children' can be any React node (elements, components, text, etc.)
}

/**
 * ProtectedRoute component
 * Renders its children if the user is authenticated, otherwise redirects to the authentication page.
 * It uses the useChatContext hook to access the authentication state.
 *
 * @param {ProtectedRouteProps} props - The component props.
 * @returns {React.ReactNode} The protected content or a Navigate component for redirection.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Use a type assertion or ensure `useChatContext` is typed to return `ChatContextType`
  const { state } = useChatContext() as ChatContextType;
  const { isAuthenticated } = state;

  // If the user is not authenticated, redirect them to the /auth route
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the children components.
  // <Outlet /> is typically used when you have nested routes that are protected
  // and rendered by a parent protected route. 'children' is for directly wrapping a component.
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
