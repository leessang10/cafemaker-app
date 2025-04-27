import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '홈',
            tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            title: '상권 분석',
            tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="estimate"
          options={{
            title: '창업 견적',
            tabBarIcon: ({ color }) => <FontAwesome name="file-text-o" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="inquiry"
          options={{
            title: '창업 문의',
            tabBarIcon: ({ color }) => <FontAwesome name="comments" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: '더보기',
            tabBarIcon: ({ color }) => <FontAwesome name="ellipsis-h" size={24} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
