import React from 'react';
import { User, Conversation } from '../../types';
import { useChatContext } from '../../provider/ChatContext';
import { formatTimeAgo } from '../../utils/dateUtils';

type ContactItemProps = {
  conversation: Conversation;
};

const StatusIndicator = ({ status }: { status: User['status'] }) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColors[status]}`}></span>
  );
};

const ContactItem: React.FC<ContactItemProps> = ({ conversation }) => {
  const { state, dispatch } = useChatContext();
  const { activeConversationId } = state;
  
  // Find the other participant (not the current user)
  const otherParticipant = conversation.participants.find(
    p => p.id !== state.currentUser.id
  ) as User;
  
  const lastMessage = conversation.lastMessage;
  const isActive = activeConversationId === conversation.id;
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleClick = () => {
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: conversation.id });
  };

  return (
    <div
      className={`flex items-center p-3 cursor-pointer transition-colors duration-150 ${
        isActive 
          ? 'bg-indigo-50 dark:bg-indigo-900/20' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={otherParticipant.avatar}
          alt={otherParticipant.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <StatusIndicator status={otherParticipant.status} />
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 dark:text-white">{otherParticipant.name}</h3>
          {lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          {lastMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {lastMessage.senderId === state.currentUser.id ? 'You: ' : ''}
              {truncateText(lastMessage.text, 30)}
            </p>
          )}
          
          {conversation.unreadCount > 0 && (
            <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;