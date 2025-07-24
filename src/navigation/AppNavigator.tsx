import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import AuthScreen from '@screens/AuthScreen';
import OnboardingScreen from '@screens/OnboardingScreen';

import HomeScreen from '@screens/HomeScreen';

const MarketAnalysisScreen = () => (
  <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
    <Text className="text-lg font-semibold text-gray-900 dark:text-white">상권분석 Screen</Text>
  </View>
);

const EstimateScreen = () => (
  <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
    <Text className="text-lg font-semibold text-gray-900 dark:text-white">카페견적 Screen</Text>
  </View>
);

const ConsultationScreen = () => (
  <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
    <Text className="text-lg font-semibold text-gray-900 dark:text-white">창업문의 Screen</Text>
  </View>
);

import MoreScreen from '@screens/MoreScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { currentTheme } = useAppStore();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'MarketAnalysis':
              iconName = focused ? 'analytics' : 'analytics-outline';
              break;
            case 'Estimate':
              iconName = focused ? 'calculator' : 'calculator-outline';
              break;
            case 'Consultation':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'More':
              iconName = focused ? 'menu' : 'menu-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: currentTheme === 'dark' ? '#3B82F6' : '#1D4ED8',
        tabBarInactiveTintColor: currentTheme === 'dark' ? '#9CA3AF' : '#6B7280',
        tabBarStyle: {
          backgroundColor: currentTheme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopColor: currentTheme === 'dark' ? '#374151' : '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: currentTheme === 'dark' ? '#1F2937' : '#FFFFFF',
        },
        headerTintColor: currentTheme === 'dark' ? '#FFFFFF' : '#1F2937',
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '홈' }} 
      />
      <Tab.Screen 
        name="MarketAnalysis" 
        component={MarketAnalysisScreen} 
        options={{ title: '상권분석' }} 
      />
      <Tab.Screen 
        name="Estimate" 
        component={EstimateScreen} 
        options={{ title: '카페견적' }} 
      />
      <Tab.Screen 
        name="Consultation" 
        component={ConsultationScreen} 
        options={{ title: '창업문의' }} 
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen} 
        options={{ title: '더보기' }} 
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  const { user, loading } = useAuthStore();
  const { isOnboardingCompleted } = useAppStore();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthScreen />
      ) : !isOnboardingCompleted ? (
        <OnboardingScreen />
      ) : (
        <TabNavigator />
      )}
    </NavigationContainer>
  );
}