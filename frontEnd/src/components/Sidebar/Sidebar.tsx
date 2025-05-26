import React from 'react';
import { useChatContext } from '../../provider/ChatContext';
import ContactList from './ContactList';
import { Settings, Sun, Moon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { state, dispatch } = useChatContext();
  const { currentUser, theme } = state;

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentUser.name}</h2>
            <p className="text-xs text-green-600 dark:text-green-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                      dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                            dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ContactList />
      </div>
    </div>
  );
};

export default Sidebar;