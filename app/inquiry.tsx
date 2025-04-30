import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';

const dummyInquiries = [
  { id: '1', title: '카페 창업 문의', date: '2024-04-26' },
  { id: '2', title: '원두 공급 문의', date: '2024-04-25' },
];

export default function InquiryScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={[styles.header, { borderBottomColor: colors.primaryLight }]}>
        <Typography variant="title">창업 문의</Typography>
        <TouchableOpacity style={[styles.newInquiryButton, { backgroundColor: colors.primary }]}>
          <Typography style={styles.newInquiryButtonText}>새 문의 작성</Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyInquiries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.inquiryItem, { borderBottomColor: colors.primaryLight }]}>
            <Typography variant="body">{item.title}</Typography>
            <Typography variant="caption">{item.date}</Typography>
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
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  newInquiryButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  newInquiryButtonText: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  inquiryItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
});
