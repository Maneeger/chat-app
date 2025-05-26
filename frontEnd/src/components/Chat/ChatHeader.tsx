import React from 'react';
import { useChatContext } from '../../provider/ChatContext';
import { Phone, Video, Info } from 'lucide-react';

const ChatHeader: React.FC = () => {
  const { state } = useChatContext();
  const { conversations, activeConversationId, currentUser } = state;
  
  if (!activeConversationId) return null;
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  if (!activeConversation) return null;
  
  // Get the other participant
  const otherParticipant = activeConversation.participants.find(
    p => p.id !== currentUser.id
  );
  
  if (!otherParticipant) return null;

  const isOnline = otherParticipant.status === 'online';
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
        </div>
        
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{otherParticipant.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isOnline ? 'Online' : `Last seen ${otherParticipant.lastActive}`}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                          dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Phone className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                          dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Video className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                          dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Info className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;