import React, { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import ContactItem from './ContactItem';
import { Search } from 'lucide-react';

const ContactList: React.FC = () => {
  const { state } = useChatContext();
  const { conversations } = state;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = conversation.participants.find(
      p => p.id !== state.currentUser.id
    );
    
    if (!otherParticipant) return false;

    // Search by name or last message
    return (
      otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.lastMessage?.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                      text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.length > 0 ? (
          filteredConversations.map(conversation => (
            <ContactItem 
              key={conversation.id} 
              conversation={conversation} 
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;