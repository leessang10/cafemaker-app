import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../lib/supabase';

type FAQDetail = {
  title: string;
  content: string;
};

export default function FAQDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [faq, setFaq] = useState<FAQDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchFaqDetail(id);
    }
  }, [id]);

  const fetchFaqDetail = async (faqId: string) => {
    try {
      const { data, error } = await supabase.from('faqs').select('title, content').eq('id', faqId).single();

      if (error) throw error;
      setFaq(data);
    } catch (error) {
      console.error('Error fetching FAQ detail:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{faq?.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.content}>{faq?.content}</Text>
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
