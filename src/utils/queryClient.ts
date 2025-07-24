import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408 (timeout)
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 408) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query Keys
export const queryKeys = {
  // Auth
  auth: {
    user: ['auth', 'user'] as const,
    session: ['auth', 'session'] as const,
  },
  
  // Profile
  profile: {
    all: ['profile'] as const,
    detail: (id: string) => ['profile', id] as const,
  },
  
  // Estimates
  estimates: {
    all: ['estimates'] as const,
    list: (userId: string) => ['estimates', 'list', userId] as const,
    detail: (id: string) => ['estimates', 'detail', id] as const,
    templates: ['estimates', 'templates'] as const,
  },
  
  // Chat
  chat: {
    all: ['chat'] as const,
    messages: (roomId: string) => ['chat', 'messages', roomId] as const,
    rooms: (userId: string) => ['chat', 'rooms', userId] as const,
  },
  
  // Content
  content: {
    notices: ['content', 'notices'] as const,
    events: ['content', 'events'] as const,
    faqs: ['content', 'faqs'] as const,
    successStories: ['content', 'success-stories'] as const,
  },
  
  // Market Analysis
  market: {
    all: ['market'] as const,
    analysis: (id: string) => ['market', 'analysis', id] as const,
    history: (userId: string) => ['market', 'history', userId] as const,
  },
} as const;