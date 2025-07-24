import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Appearance } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '@utils/queryClient';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@utils/supabase';
import AppNavigator from '@navigation/AppNavigator';

import './global.css';

export default function App() {
  const { initializeTheme, setTheme, currentTheme } = useAppStore();
  const { setSession, setLoading, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize theme
    initializeTheme();
    
    // Listen for theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const { theme } = useAppStore.getState();
      if (theme === 'system') {
        setTheme('system');
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Initialize auth
    initialize();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as any);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <View style={{ flex: 1 }} className={currentTheme === 'dark' ? 'dark' : ''}>
            <AppNavigator />
            <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
          </View>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
