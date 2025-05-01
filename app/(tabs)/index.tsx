import React from 'react';
import { useRouter } from 'expo-router';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@src/context/ThemeContext';
import { COLORS, globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';

const { width } = Dimensions.get('window');

type IoniconsName = 'location' | 'calculator' | 'chatbubbles' | 'book' | 'trophy' | 'help-circle' | 'notifications';

const features: { id: string; label: string; icon: IoniconsName; description: string }[] = [
  {
    id: '1',
    label: '상권 분석',
    icon: 'location',
    description: '입지 선정부터 상권 분석까지\n한 번에 확인하세요',
  },
  {
    id: '2',
    label: '창업 견적',
    icon: 'calculator',
    description: '예상 비용과 수익을\n미리 계산해보세요',
  },
  {
    id: '3',
    label: '창업 문의',
    icon: 'chatbubbles',
    description: '전문가와 상담하여\n궁금증을 해결하세요',
  },
];

const guides = [
  { id: '1', title: '카페 창업 준비 가이드', category: '창업 가이드' },
  { id: '2', title: '카페 인테리어 디자인 가이드', category: '창업 가이드' },
  { id: '3', title: '메뉴 개발과 원가 관리', category: '창업 가이드' },
  { id: '4', title: '직원 채용과 교육 가이드', category: '창업 가이드' },
];

const successStories = [
  { id: '1', title: '강남역 카페 성공 스토리', category: '성공 사례' },
  { id: '2', title: '주택가 카페 창업 성공기', category: '성공 사례' },
  { id: '3', title: '프랜차이즈 카페 운영 노하우', category: '성공 사례' },
  { id: '4', title: '독립 카페 브랜드 성공기', category: '성공 사례' },
];

type EventItem = {
  id: string;
  title: string;
  color: string;
};

const events: EventItem[] = [
  { id: '1', title: '5월 신규 창업 지원 이벤트', color: COLORS.gray500 },
  { id: '2', title: '창업 컨설팅 50% 할인', color: COLORS.gray500 },
  { id: '3', title: '카페 인테리어 디자인 지원', color: COLORS.gray500 },
];

type CardItem = {
  id: string;
  title: string;
  category: string;
};

const notices = [
  { id: '1', title: '5월 신규 이벤트 안내', date: '2024-05-01' },
  { id: '2', title: '앱 업데이트 공지', date: '2024-04-28' },
  { id: '3', title: '창업 가이드북 무료 배포', date: '2024-04-25' },
];

const faqs = [
  { id: '1', question: '카페 창업에 필요한 초기 자금은 얼마인가요?', category: '창업 준비' },
  { id: '2', question: '상권 분석은 어떻게 하나요?', category: '상권 분석' },
  { id: '3', question: '카페 인테리어 비용은 얼마나 드나요?', category: '인테리어' },
  { id: '4', question: '직원 채용 시 주의할 점은 무엇인가요?', category: '운영 관리' },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const renderEventItem = ({ item }: { item: EventItem }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={[styles.eventImage, { backgroundColor: item.color }]}>
        <View style={styles.eventOverlay}>
          <Typography variant="title" style={styles.eventTitle}>
            {item.title}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item }: { item: CardItem }) => (
    <TouchableOpacity style={[styles.cardItem, { backgroundColor: colors.background }]}>
      <View style={styles.cardContent}>
        <Typography variant="caption" style={[styles.cardCategory, { color: colors.primary }]}>
          {item.category}
        </Typography>
        <Typography variant="body" style={styles.cardTitle}>
          {item.title}
        </Typography>
        <View style={styles.cardArrow}>
          <Ionicons name="arrow-forward" size={20} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[globalStyles.container]} edges={['left', 'right', 'top']}>
      <ScrollView style={{ backgroundColor: colors.gray50 }}>
        {/* 이벤트 배너 */}
        <View style={styles.eventSection}>
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventList}
            snapToInterval={width}
            decelerationRate="fast"
            snapToAlignment="start"
            style={styles.eventFlatList}
          />
        </View>

        {/* 주요 서비스 */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle" style={styles.sectionTitle}>
              주요 서비스
            </Typography>
          </View>
          <FlatList
            data={features}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.cardItem, { backgroundColor: colors.background }]}>
                <View style={styles.cardContent}>
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceIconContainer}>
                      <Ionicons name={item.icon} size={24} color={colors.primary} />
                    </View>
                    <Typography variant="subtitle" style={styles.cardTitle}>
                      {item.label}
                    </Typography>
                  </View>
                  <Typography variant="body" style={styles.serviceDescription}>
                    {item.description}
                  </Typography>
                  <View style={styles.cardArrow}>
                    <Ionicons name="arrow-forward" size={20} color={colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
            pagingEnabled
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            snapToAlignment="start"
          />
        </View>

        {/* 창업 가이드 */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle" style={styles.sectionTitle}>
              창업 가이드
            </Typography>
            <TouchableOpacity onPress={() => router.push('/guide')}>
              <Typography variant="caption" style={{ color: colors.primary }}>
                더보기
              </Typography>
            </TouchableOpacity>
          </View>
          <FlatList
            data={guides}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
            pagingEnabled
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            snapToAlignment="start"
          />
        </View>

        {/* 성공 사례 */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle" style={styles.sectionTitle}>
              성공 사례
            </Typography>
            <TouchableOpacity onPress={() => router.push('/success')}>
              <Typography variant="caption" style={{ color: colors.primary }}>
                더보기
              </Typography>
            </TouchableOpacity>
          </View>
          <FlatList
            data={successStories}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardList}
            pagingEnabled
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            snapToAlignment="start"
          />
        </View>

        {/* 공지사항 */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle" style={styles.sectionTitle}>
              공지사항
            </Typography>
            <TouchableOpacity onPress={() => router.push('/notice')}>
              <Typography variant="caption" style={{ color: COLORS.primary }}>
                더보기
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={[styles.cardList, styles.noticeList]}>
            {notices.map((notice) => (
              <TouchableOpacity key={notice.id} style={styles.noticeItem} activeOpacity={0.7}>
                <Typography variant="body" style={{ flex: 1 }}>
                  {notice.title}
                </Typography>
                <Typography variant="caption" style={{ color: COLORS.gray400 }}>
                  {notice.date}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle" style={styles.sectionTitle}>
              자주 묻는 질문
            </Typography>
            <TouchableOpacity onPress={() => router.push('/faq')}>
              <Typography variant="caption" style={{ color: COLORS.primary }}>
                더보기
              </Typography>
            </TouchableOpacity>
          </View>
          <FlatList
            data={faqs}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.faqItem, { backgroundColor: COLORS.background }]}>
                <View style={styles.faqContent}>
                  <Typography variant="caption" style={[styles.faqCategory, { color: COLORS.primary }]}>
                    {item.category}
                  </Typography>
                  <Typography variant="body" style={styles.faqQuestion}>
                    {item.question}
                  </Typography>
                  <View style={styles.cardArrow}>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eventSection: {
    marginBottom: 24,
    overflow: 'hidden',
  },
  eventFlatList: {
    width: width,
  },
  eventList: {
    paddingHorizontal: 0,
  },
  eventCard: {
    width: width,
    marginRight: 0,
    marginLeft: 0,
  },
  eventImage: {
    width: '100%',
    height: 200,
    marginBottom: 0,
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  cardSection: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardList: {
    paddingHorizontal: 0,
  },
  cardItem: {
    width: width * 0.8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardCategory: {
    fontSize: 12,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardArrow: {
    alignSelf: 'flex-end',
  },
  noticeList: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
  },
  faqContent: {
    padding: 16,
  },
  faqCategory: {
    fontSize: 12,
    marginBottom: 4,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
    lineHeight: 20,
  },
});
