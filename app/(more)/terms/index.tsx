import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TermsPage() {
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
        <Text style={styles.headerTitle}>이용약관</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentBox}>
        <Text style={styles.content}>여기에 이용약관 내용이 표시됩니다.\n\n1. 약관 예시\n2. 약관 예시\n3. 약관 예시</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', paddingHorizontal: 8 },
  backBtn: { padding: 4, marginRight: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222', marginLeft: 8 },
  contentBox: { backgroundColor: '#fff', borderRadius: 10, padding: 24, margin: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  content: { fontSize: 16, color: '#333', lineHeight: 22 },
});
