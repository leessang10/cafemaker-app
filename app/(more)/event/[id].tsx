import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function EventDetailPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>이벤트 상세</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
