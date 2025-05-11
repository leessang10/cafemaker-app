import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const MOCK_SUCCESS_CASES = [
  { id: 1, title: '성공사례 1' },
  { id: 2, title: '성공사례 2' },
  { id: 3, title: '성공사례 3' },
];

export default function SuccessCasesListPage() {
  return (
    <View>
      <Text>성공사례 목록</Text>
      {MOCK_SUCCESS_CASES.map((success) => (
        <Link key={success.id} href={`/success/${success.id}`} asChild>
          <Pressable>
            <Text>{success.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
