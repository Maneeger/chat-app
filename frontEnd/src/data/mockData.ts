import { User, Conversation, Message } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Morgan',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  status: 'online',
};

export const contacts: User[] = [
  {
    id: 'user-2',
    name: 'Taylor Swift',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    lastActive: 'Just now',
  },
  {
    id: 'user-3',
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'offline',
    lastActive: '3 hours ago',
  },
  {
    id: 'user-4',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'away',
    lastActive: '15 minutes ago',
  },
  {
    id: 'user-5',
    name: 'Michael Brown',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    lastActive: 'Just now',
  },
  {
    id: 'user-6',
    name: 'Sophia Garcia',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'offline',
    lastActive: '1 day ago',
  },
];

const createMessage = (id: string, senderId: string, text: string, timestamp: string, status: Message['status'] = 'read'): Message => ({
  id,
  senderId,
  text,
  timestamp,
  status,
});

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [currentUser, contacts[0]],
    messages: [
      createMessage('msg-1', 'user-2', 'Hey, how are you doing?', '2023-10-15T09:24:00'),
      createMessage('msg-2', 'user-1', 'I\'m good! Just working on some new projects.', '2023-10-15T09:25:30'),
      createMessage('msg-3', 'user-2', 'Sounds exciting! What are you working on?', '2023-10-15T09:26:45'),
      createMessage('msg-4', 'user-1', 'Building a new chat app interface. It\'s coming along nicely!', '2023-10-15T09:28:00'),
      createMessage('msg-5', 'user-2', 'That\'s awesome! Can\'t wait to see it when it\'s done.', '2023-10-15T09:30:15', 'delivered'),
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-2',
    participants: [currentUser, contacts[1]],
    messages: [
      createMessage('msg-6', 'user-3', 'Hi Alex, do you have the report ready?', '2023-10-14T14:05:00'),
      createMessage('msg-7', 'user-1', 'I\'m still working on it. Should be done by tomorrow.', '2023-10-14T14:10:25'),
      createMessage('msg-8', 'user-3', 'Great, thanks!', '2023-10-14T14:12:30'),
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participants: [currentUser, contacts[2]],
    messages: [
      createMessage('msg-9', 'user-4', 'Are we still meeting for coffee tomorrow?', '2023-10-13T18:30:00'),
      createMessage('msg-10', 'user-1', 'Absolutely! 3 PM at the usual place?', '2023-10-13T18:35:20'),
      createMessage('msg-11', 'user-4', 'Perfect! See you then!', '2023-10-13T18:36:45'),
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-4',
    participants: [currentUser, contacts[3]],
    messages: [
      createMessage('msg-12', 'user-5', 'Hey, have you seen the new movie that just came out?', '2023-10-12T20:15:00'),
      createMessage('msg-13', 'user-1', 'Not yet, but I\'ve heard it\'s really good!', '2023-10-12T20:18:10'),
      createMessage('msg-14', 'user-5', 'We should go see it this weekend!', '2023-10-12T20:20:30'),
      createMessage('msg-15', 'user-1', 'Sounds like a plan!', '2023-10-12T20:22:15'),
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-5',
    participants: [currentUser, contacts[4]],
    messages: [
      createMessage('msg-16', 'user-6', 'Alex, can you send me that document we discussed?', '2023-10-10T09:45:00'),
      createMessage('msg-17', 'user-1', 'Of course, I\'ll email it to you right away.', '2023-10-10T09:50:30'),
      createMessage('msg-18', 'user-6', 'Thank you!', '2023-10-10T09:52:15'),
    ],
    unreadCount: 0,
  },
];

// Set the last message for each conversation
mockConversations.forEach(conversation => {
  if (conversation.messages.length > 0) {
    conversation.lastMessage = conversation.messages[conversation.messages.length - 1];
  }
});