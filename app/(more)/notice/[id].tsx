import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function NoticeDetailPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>공지사항 상세</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
