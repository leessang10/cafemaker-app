import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function MorePage() {
  return (
    <View>
      <Link href="/notice" asChild>
        <Pressable>
          <Text>공지사항</Text>
        </Pressable>
      </Link>

      <Link href="/faq" asChild>
        <Pressable>
          <Text>FAQ</Text>
        </Pressable>
      </Link>

      <Link href="/success" asChild>
        <Pressable>
          <Text>성공사례</Text>
        </Pressable>
      </Link>

      <Link href="/event" asChild>
        <Pressable>
          <Text>이벤트</Text>
        </Pressable>
      </Link>
    </View>
  );
}
