import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MOCK_DETAIL = {
  1: { title: '이벤트 1', content: '이벤트 1의 상세 내용입니다.' },
  2: { title: '이벤트 2', content: '이벤트 2의 상세 내용입니다.' },
  3: { title: '이벤트 3', content: '이벤트 3의 상세 내용입니다.' },
};

export default function EventDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  let event = undefined;
  if (typeof id === 'string') {
    event = MOCK_DETAIL[parseInt(id) as keyof typeof MOCK_DETAIL];
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>이벤트</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{event?.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.content}>{event?.content}</Text>
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
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 16 },
  content: { fontSize: 15, color: '#333', lineHeight: 22 },
});
