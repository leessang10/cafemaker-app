import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@src/context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const guides = [
  { id: '1', title: '카페 창업 준비 가이드', category: '창업 준비' },
  { id: '2', title: '카페 인테리어 디자인 가이드', category: '인테리어' },
  { id: '3', title: '메뉴 개발과 원가 관리', category: '메뉴 개발' },
  { id: '4', title: '직원 채용과 교육 가이드', category: '인사 관리' },
  { id: '5', title: '카페 마케팅 전략', category: '마케팅' },
  { id: '6', title: '카페 운영 관리 가이드', category: '운영 관리' },
];

export default function GuideScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.gray900 }]}>창업 가이드</Text>
          </View>

          {guides.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              style={[styles.card, { backgroundColor: colors.primaryBg }]}
              onPress={() => {
                // TODO: 가이드 상세 페이지로 이동
              }}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.cardCategory, { color: colors.primary }]}>{guide.category}</Text>
                <Text style={[styles.cardTitle, { color: colors.gray900 }]}>{guide.title}</Text>
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
  },
});
