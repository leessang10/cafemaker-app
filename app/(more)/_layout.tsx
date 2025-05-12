import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="notice/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notice/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="faq/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="faq/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
