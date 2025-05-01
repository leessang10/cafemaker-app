import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@src/context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const events = [
  {
    id: '1',
    title: '5월 신규 창업 지원 이벤트',
    date: '2024-05-01 ~ 2024-05-31',
    image: 'https://example.com/event1.jpg',
    content: '5월 한정 창업 지원 이벤트가 시작됩니다.',
  },
  {
    id: '2',
    title: '창업 컨설팅 50% 할인',
    date: '2024-04-15 ~ 2024-05-15',
    image: 'https://example.com/event2.jpg',
    content: '전문가 컨설팅을 50% 할인된 가격에 이용하세요.',
  },
];

export default function EventScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.gray900 }]}>이벤트</Text>
          </View>

          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.card, { backgroundColor: colors.primaryBg }]}
              onPress={() => {
                // TODO: 이벤트 상세 페이지로 이동
              }}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.gray900 }]}>{event.title}</Text>
                <Text style={[styles.cardDate, { color: colors.gray600 }]}>{event.date}</Text>
              </View>
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
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 160,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 16,
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
