export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  read_at?: string;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'document' | 'file';
  url: string;
  name: string;
  size: number;
}

export interface ChatRoom {
  id: string;
  user_id: string;
  admin_id?: string;
  status: 'active' | 'closed' | 'waiting';
  last_message?: ChatMessage;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  room: ChatRoom | null;
  typing: {
    user_id: string;
    is_typing: boolean;
  }[];
}

export interface SendMessagePayload {
  message: string;
  attachments?: File[];
}

export interface TypingIndicator {
  user_id: string;
  is_typing: boolean;
  timestamp: string;
}