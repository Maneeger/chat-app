import React, { useState } from 'react';
import { Message as MessageType, User } from '../../types';
import { useChatContext } from '../../context/ChatContext';
import { Check, SmilePlus } from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';

type MessageProps = {
  message: MessageType;
  sender: User;
};

const MessageStatus: React.FC<{ status: MessageType['status'] }> = ({ status }) => {
  switch (status) {
    case 'sending':
      return <div className="h-3 w-3 rounded-full border-2 border-gray-300 border-t-transparent animate-spin"></div>;
    case 'sent':
      return <Check className="h-4 w-4 text-gray-400" />;
    case 'delivered':
      return (
        <div className="flex -space-x-1">
          <Check className="h-4 w-4 text-gray-400" />
          <Check className="h-4 w-4 text-gray-400" />
        </div>
      );
    case 'read':
      return (
        <div className="flex -space-x-1">
          <Check className="h-4 w-4 text-blue-500" />
          <Check className="h-4 w-4 text-blue-500" />
        </div>
      );
    default:
      return null;
  }
};

const emojiOptions = ['👍', '❤️', '😂', '😮', '😢', '👏'];

const Message: React.FC<MessageProps> = ({ message, sender }) => {
  const { state, dispatch } = useChatContext();
  const isCurrentUser = sender.id === state.currentUser.id;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddReaction = (emoji: string) => {
    const activeConversationId = state.activeConversationId;
    if (!activeConversationId) return;
    
    dispatch({
      type: 'ADD_REACTION',
      payload: {
        conversationId: activeConversationId,
        messageId: message.id,
        reaction: emoji,
        userId: state.currentUser.id,
      },
    });
    
    setShowEmojiPicker(false);
  };

  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-3">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      )}
      
      <div className={`relative max-w-xs md:max-w-md group ${isCurrentUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isCurrentUser
              ? 'bg-indigo-600 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        
        <div className="flex items-center mt-1 text-xs">
          <span className={`${isCurrentUser ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatTime(message.timestamp)}
          </span>
          
          {isCurrentUser && (
            <div className="ml-2 flex items-center">
              <MessageStatus status={message.status} />
            </div>
          )}
        </div>
        
        {/* Emoji reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="flex mt-1 -ml-1">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <div 
                key={emoji}
                className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs mr-1"
              >
                <span className="mr-1">{emoji}</span>
                <span className="text-gray-600 dark:text-gray-400">{users.length}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Emoji picker button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity 
                    -left-8 rounded-full p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100
                    dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
        >
          <SmilePlus className="h-4 w-4" />
        </button>
        
        {/* Emoji picker */}
        {showEmojiPicker && (
          <div className="absolute -top-10 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-10 flex space-x-2">
            {emojiOptions.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleAddReaction(emoji)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;