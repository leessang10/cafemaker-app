import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function FAQDetailPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>FAQ 상세</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
