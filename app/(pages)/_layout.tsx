import { Stack } from 'expo-router';
import { useTheme } from '@src/context/ThemeContext';

export default function PagesLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
