import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@src/context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const notices = [
  { id: '1', title: '5월 신규 이벤트 안내', date: '2024-05-01', content: '5월 한정 이벤트가 시작됩니다.' },
  { id: '2', title: '앱 업데이트 공지', date: '2024-04-28', content: '새로운 기능이 추가되었습니다.' },
  { id: '3', title: '창업 가이드북 무료 배포', date: '2024-04-25', content: '카페 창업 가이드북을 무료로 배포합니다.' },
];

export default function NoticeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.gray900 }]}>공지사항</Text>
          </View>

          {notices.map((notice) => (
            <TouchableOpacity
              key={notice.id}
              style={[styles.card, { backgroundColor: colors.primaryBg }]}
              onPress={() => {
                // TODO: 공지사항 상세 페이지로 이동
              }}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.gray900 }]}>{notice.title}</Text>
                <Text style={[styles.cardDate, { color: colors.gray600 }]}>{notice.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.gray400} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
  },
});
