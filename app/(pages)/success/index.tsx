import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@src/context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const successStories = [
  { id: '1', title: '강남 카페 A', category: '성공 사례', content: '월 매출 3,000만원 달성' },
  { id: '2', title: '홍대 카페 B', category: '성공 사례', content: 'SNS 마케팅으로 인기 카페로 성장' },
];

export default function SuccessScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.gray900 }]}>성공사례</Text>
          </View>

          {successStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[styles.card, { backgroundColor: colors.primaryBg }]}
              onPress={() => {
                // TODO: 성공사례 상세 페이지로 이동
              }}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.cardCategory, { color: colors.primary }]}>{story.category}</Text>
                <Text style={[styles.cardTitle, { color: colors.gray900 }]}>{story.title}</Text>
                <Text style={[styles.cardDescription, { color: colors.gray700 }]}>{story.content}</Text>
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
  cardCategory: {
    fontSize: 12,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
