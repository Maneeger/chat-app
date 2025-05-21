import React, { useEffect } from 'react';
import { ChatProvider, useChatContext } from './context/ChatContext';
import Sidebar from './components/Sidebar/Sidebar';
import ChatContainer from './components/Chat/ChatContainer';
import AuthForms from './components/Auth/AuthForms';
import LandingPage from './components/Landing/LandingPage';

function ChatApp() {
  const { state } = useChatContext();
  const { theme, isAuthenticated } = state;
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-full sm:w-80 md:w-96">
        <Sidebar />
      </div>
      <div className="hidden sm:flex flex-col flex-1">
        <ChatContainer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <div className="antialiased text-cream-100 bg-teal-950 transition-colors duration-200">
        <ChatApp />
      </div>
    </ChatProvider>
  );
}

export default App;