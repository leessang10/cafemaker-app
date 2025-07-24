import { create } from 'zustand';
import { AuthUser, AuthSession } from '@types/authTypes';

interface AuthStore {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  
  setSession: (session) => set({ 
    session, 
    user: session?.user || null 
  }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  clearAuth: () => set({ 
    user: null, 
    session: null, 
    loading: false, 
    error: null 
  }),
  
  initialize: () => {
    set({ loading: true, error: null });
  },
}));