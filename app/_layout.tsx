import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import ThemeProvider from '@src/context/ThemeContext';
import { useTheme } from '@src/context/ThemeContext';
import { Platform } from 'react-native';

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.gray200,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: '상권 분석',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="estimate"
        options={{
          title: '창업 견적',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'calculator' : 'calculator-outline'} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inquiry"
        options={{
          title: '창업 문의',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: '더보기',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'} size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <TabNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
