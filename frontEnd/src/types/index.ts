export type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastActive?: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: {
    [key: string]: string[];
  };
};

export type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
};

export type ChatState = {
  currentUser: User;
  conversations: Conversation[];
  activeConversationId: string | null;
  theme: 'light' | 'dark';
  isAuthenticated: boolean;
};

export type ChatAction = 
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: string }
  | { type: 'SEND_MESSAGE'; payload: { conversationId: string; text: string } }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'ADD_REACTION'; payload: { conversationId: string; messageId: string; reaction: string; userId: string } }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_AUTHENTICATED'; payload: boolean };