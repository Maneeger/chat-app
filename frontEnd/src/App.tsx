import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider, useChatContext } from './provider/ChatContext';
import ProtectedRoute from './components/Protected/protected';
import Sidebar from './components/Sidebar/Sidebar';
import ChatContainer from './components/Chat/ChatContainer';
import Layout from "./components/Layout/Layout";
import AuthForms from './components/Auth/AuthForms';
import LandingPage from './components/Landing/LandingPage';

 

  function App() {
    useEffect(() => {
    // Add the desired Tailwind classes to the body element
    document.body.classList.add(
      'antialiased',
      'text-cream-100',
      'bg-teal-950',
      'transition-colors',
      'duration-200'
    );

    // Optional: Clean up the classes when the component unmounts
    // This is good practice, though for the root App component, it's less critical
    // as the body styles are likely meant to persist for the app's lifetime.
    return () => {
      document.body.classList.remove(
        'antialiased',
        'text-cream-100',
        'bg-teal-950',
        'transition-colors',
        'duration-200'
      );
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Router>
    <Routes>
      <Route path="/" element={
         <Layout>
        <LandingPage />
        </Layout>
        } />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
           <ChatContainer/>
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  );
}





export default App;