import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@src/context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const faqs = [
  {
    id: '1',
    question: '카페 창업에 필요한 초기 자금은 얼마인가요?',
    category: '창업 준비',
    answer: '카페 창업 초기 자금은 위치, 규모, 인테리어 등에 따라 다르지만, 일반적으로 1억원에서 3억원 정도가 필요합니다.',
  },
  {
    id: '2',
    question: '상권 분석은 어떻게 하나요?',
    category: '상권 분석',
    answer: '상권 분석은 인구 통계, 유동인구, 경쟁 업체, 교통 편의성 등을 종합적으로 고려하여 진행합니다.',
  },
  {
    id: '3',
    question: '카페 인테리어 비용은 얼마나 드나요?',
    category: '인테리어',
    answer: '카페 인테리어 비용은 평수와 디자인에 따라 다르지만, 평균적으로 1,000만원에서 3,000만원 정도가 소요됩니다.',
  },
];

export default function FAQScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.gray900 }]}>자주 묻는 질문</Text>
          </View>

          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={[styles.card, { backgroundColor: colors.primaryBg }]}
              onPress={() => {
                // TODO: FAQ 상세 페이지로 이동
              }}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.cardCategory, { color: colors.primary }]}>{faq.category}</Text>
                <Text style={[styles.cardQuestion, { color: colors.gray900 }]}>{faq.question}</Text>
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
  cardQuestion: {
    fontSize: 16,
    fontWeight: '600',
  },
});
