import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const MOCK_FAQS = [
  { id: 1, title: 'FAQ 1' },
  { id: 2, title: 'FAQ 2' },
  { id: 3, title: 'FAQ 3' },
];

export default function FAQListPage() {
  const router = useRouter();
  const handleBack = () => {
    router.replace('/more');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>
      <FlatList
        data={MOCK_FAQS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/faq/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ position: 'absolute', right: 16, top: 18 }} />
            </Pressable>
          </Link>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', paddingHorizontal: 8 },
  backBtn: { padding: 4, marginRight: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginLeft: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#222' },
});
