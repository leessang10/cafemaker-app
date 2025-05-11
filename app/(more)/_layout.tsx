import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notice"
        options={{
          headerTitle: '공지사항',
        }}
      />
      <Stack.Screen
        name="faq"
        options={{
          headerTitle: 'FAQ',
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          headerTitle: '성공사례',
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          headerTitle: '이벤트',
        }}
      />
    </Stack>
  );
}
