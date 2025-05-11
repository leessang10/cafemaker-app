import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const MOCK_EVENTS = [
  { id: 1, title: '이벤트 1' },
  { id: 2, title: '이벤트 2' },
  { id: 3, title: '이벤트 3' },
];

export default function EventListPage() {
  return (
    <View>
      <Text>이벤트 목록</Text>
      {MOCK_EVENTS.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} asChild>
          <Pressable>
            <Text>{event.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
