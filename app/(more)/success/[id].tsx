import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function SuccessCaseDetailPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>성공사례 상세</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
