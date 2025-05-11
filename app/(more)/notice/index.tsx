import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const MOCK_NOTICES = [
  { id: 1, title: '공지사항 1' },
  { id: 2, title: '공지사항 2' },
  { id: 3, title: '공지사항 3' },
];

export default function NoticeListPage() {
  return (
    <View>
      <Text>공지사항 목록</Text>
      {MOCK_NOTICES.map((notice) => (
        <Link key={notice.id} href={`/notice/${notice.id}`} asChild>
          <Pressable>
            <Text>{notice.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
