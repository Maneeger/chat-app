import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../../context/ChatContext';
import Message from './Message';

const MessageList: React.FC = () => {
  const { state } = useChatContext();
  const { conversations, activeConversationId, currentUser } = state;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-850">
        <p className="text-gray-500 dark:text-gray-400">Select a conversation to start chatting</p>
      </div>
    );
  }

  // Get the other participant
  const otherParticipant = activeConversation.participants.find(
    p => p.id !== currentUser.id
  );

  if (!otherParticipant) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-850">
      <div className="flex flex-col space-y-2">
        {activeConversation.messages.map(message => (
          <Message
            key={message.id}
            message={message}
            sender={
              message.senderId === currentUser.id
                ? currentUser
                : otherParticipant
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;