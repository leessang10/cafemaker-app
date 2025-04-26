import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyInquiries = [
  { id: '1', title: '카페 창업 문의', date: '2024-04-26' },
  { id: '2', title: '원두 공급 문의', date: '2024-04-25' },
];

export default function InquiryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>창업 문의</Text>
        <TouchableOpacity style={styles.newInquiryButton}>
          <Text style={styles.newInquiryButtonText}>새 문의 작성</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyInquiries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.inquiryItem}>
            <Text style={styles.inquiryTitle}>{item.title}</Text>
            <Text style={styles.inquiryDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  newInquiryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  newInquiryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  inquiryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inquiryTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  inquiryDate: {
    fontSize: 14,
    color: '#666',
  },
});
