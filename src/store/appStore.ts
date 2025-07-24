import { create } from 'zustand';
import { Appearance } from 'react-native';

interface AppStore {
  theme: 'light' | 'dark' | 'system';
  currentTheme: 'light' | 'dark';
  isOnboardingCompleted: boolean;
  notificationSettings: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setOnboardingCompleted: (completed: boolean) => void;
  updateNotificationSettings: (settings: Partial<AppStore['notificationSettings']>) => void;
  initializeTheme: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  theme: 'system',
  currentTheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  isOnboardingCompleted: false,
  notificationSettings: {
    push: true,
    email: true,
    marketing: false,
  },

  setTheme: (theme) => {
    let currentTheme: 'light' | 'dark' = 'light';
    
    if (theme === 'system') {
      currentTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
    } else {
      currentTheme = theme;
    }
    
    set({ theme, currentTheme });
  },

  setOnboardingCompleted: (completed) => set({ isOnboardingCompleted: completed }),

  updateNotificationSettings: (settings) =>
    set((state) => ({
      notificationSettings: { ...state.notificationSettings, ...settings },
    })),

  initializeTheme: () => {
    const { theme } = get();
    if (theme === 'system') {
      const systemTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
      set({ currentTheme: systemTheme });
    }
  },
}));