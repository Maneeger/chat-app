import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, ChatAction, Message } from '../types';
import { currentUser, mockConversations } from '../data/mockData';

const initialState: ChatState = {
  currentUser,
  conversations: mockConversations,
  activeConversationId: mockConversations.length > 0 ? mockConversations[0].id : null,
  theme: 'light',
  isAuthenticated: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_ACTIVE_CONVERSATION':
      return {
        ...state,
        activeConversationId: action.payload,
        conversations: state.conversations.map(conv => 
          conv.id === action.payload ? { ...conv, unreadCount: 0 } : conv
        ),
      };
    
    case 'SEND_MESSAGE': {
      const { conversationId, text } = action.payload;
      const timestamp = new Date().toISOString();
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: state.currentUser.id,
        text,
        timestamp,
        status: 'sending',
      };

      return {
        ...state,
        conversations: state.conversations.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: newMessage,
              }
            : conv
        ),
      };
    }
    
    case 'MARK_AS_READ':
      return {
        ...state,
        conversations: state.conversations.map(conv => 
          conv.id === action.payload
            ? {
                ...conv,
                unreadCount: 0,
                messages: conv.messages.map(msg => 
                  msg.senderId !== state.currentUser.id && msg.status !== 'read'
                    ? { ...msg, status: 'read' }
                    : msg
                ),
              }
            : conv
        ),
      };
      
    case 'ADD_REACTION': {
      const { conversationId, messageId, reaction, userId } = action.payload;
      
      return {
        ...state,
        conversations: state.conversations.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                messages: conv.messages.map(msg => 
                  msg.id === messageId
                    ? {
                        ...msg,
                        reactions: {
                          ...msg.reactions,
                          [reaction]: msg.reactions && msg.reactions[reaction]
                            ? [...msg.reactions[reaction], userId]
                            : [userId],
                        },
                      }
                    : msg
                ),
              }
            : conv
        ),
      };
    }
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
      
    default:
      return state;
  }
}

type ChatContextType = {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Simulate message status updates
  React.useEffect(() => {
    state.conversations.forEach(conv => {
      conv.messages.forEach(msg => {
        if (msg.senderId === state.currentUser.id && msg.status === 'sending') {
          // Simulate sending -> sent -> delivered -> read
          setTimeout(() => {
            dispatch({
              type: 'MARK_AS_READ',
              payload: conv.id,
            });
          }, 2000);
        }
      });
    });
  }, [state.conversations]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}