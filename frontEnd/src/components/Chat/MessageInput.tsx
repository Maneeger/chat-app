import React, { useState, FormEvent } from 'react';
import { useChatContext } from '../../context/ChatContext';
import { Send, Smile, Paperclip } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { state, dispatch } = useChatContext();
  const { activeConversationId } = state;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversationId) return;
    
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        conversationId: activeConversationId,
        text: message.trim(),
      },
    });
    
    setMessage('');
  };

  const handleKeyDown = () => {
    if (!isTyping) {
      setIsTyping(true);
      // Simulate typing indicator logic here
      setTimeout(() => setIsTyping(false), 2000);
    }
  };
  
  // Disable input if no active conversation
  const isDisabled = !activeConversationId;

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                    dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          disabled={isDisabled}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={isDisabled ? "Select a conversation to start chatting" : "Type a message..."}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full
                     text-gray-900 dark:text-white bg-white dark:bg-gray-800
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
          />
          
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1
                     text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            disabled={isDisabled}
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
        
        <button
          type="submit"
          className={`p-2 rounded-full ${
            message.trim() && !isDisabled
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          } transition-colors`}
          disabled={!message.trim() || isDisabled}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;