import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MOCK_DETAIL = {
  1: { title: '공지사항 1', content: '공지사항 1의 상세 내용입니다.', date: '2024-06-01' },
  2: { title: '공지사항 2', content: '공지사항 2의 상세 내용입니다.', date: '2024-05-28' },
  3: { title: '공지사항 3', content: '공지사항 3의 상세 내용입니다.', date: '2024-05-20' },
};

export const options = { headerShown: false };

export default function NoticeDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  let notice = undefined;
  if (typeof id === 'string') {
    notice = MOCK_DETAIL[parseInt(id) as keyof typeof MOCK_DETAIL];
  }

  return (
    <View style={styles.container}>
      {/* 커스텀 헤더 */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>공지사항</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{notice?.title}</Text>
        <Text style={styles.date}>{notice?.date}</Text>
        <View style={styles.divider} />
        <Text style={styles.content}>{notice?.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', paddingHorizontal: 8 },
  backBtn: { padding: 4, marginRight: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginLeft: 8 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 24, margin: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  title: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  content: { fontSize: 15, color: '#333', lineHeight: 22 },
});
