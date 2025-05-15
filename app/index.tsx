import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function HomePage() {
  return (
    <ScrollView className={styles.container}>
      {/* 상단 헤더 */}
      <View className={styles.header}>
        <Text className={styles.headerTitle}>카페메이커</Text>
      </View>

      {/* 이벤트 섹션 - 상단으로 이동 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>진행중인 이벤트</Text>
          <TouchableOpacity>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className={styles.eventScroll} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className={styles.eventCard}>
            <View className={styles.eventImagePlaceholder}>
              <Text className={styles.eventImageText}>봄 시즌 이벤트</Text>
            </View>
            <Text className={styles.eventTitle}>봄 시즌 메뉴 출시</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.eventCard}>
            <View className={styles.eventImagePlaceholder}>
              <Text className={styles.eventImageText}>신규 가맹점</Text>
            </View>
            <Text className={styles.eventTitle}>신규 가맹점 오픈 이벤트</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 공지사항 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>공지사항</Text>
          <TouchableOpacity>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View className={styles.noticeList}>
          <TouchableOpacity className={styles.noticeItem}>
            <Text className={styles.noticeTitle}>시스템 점검 안내 (4/15)</Text>
            <Text className={styles.noticeDate}>2024.04.10</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.noticeItem}>
            <Text className={styles.noticeTitle}>카페메이커 서비스 업데이트 안내</Text>
            <Text className={styles.noticeDate}>2024.04.08</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.noticeItem}>
            <Text className={styles.noticeTitle}>4월 정기 업데이트 안내</Text>
            <Text className={styles.noticeDate}>2024.04.05</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 성공사례 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>성공사례</Text>
          <TouchableOpacity>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className={styles.successScroll} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className={styles.successCard}>
            <View className={styles.successImagePlaceholder}>
              <Text className={styles.successImageText}>서울 강남점</Text>
            </View>
            <Text className={styles.successTitle}>매출 300% 성장</Text>
            <Text className={styles.successDesc}>시스템 도입 6개월 만에 놀라운 성과</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.successCard}>
            <View className={styles.successImagePlaceholder}>
              <Text className={styles.successImageText}>부산 해운대점</Text>
            </View>
            <Text className={styles.successTitle}>운영 효율 200% 개선</Text>
            <Text className={styles.successDesc}>직원 만족도 대폭 상승</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* FAQ 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>자주 묻는 질문</Text>
          <TouchableOpacity>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View className={styles.faqList}>
          <TouchableOpacity className={styles.faqItem}>
            <Text className={styles.faqQuestion}>Q. 주문 취소는 어떻게 하나요?</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.faqItem}>
            <Text className={styles.faqQuestion}>Q. 포인트 적립은 언제 되나요?</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.faqItem}>
            <Text className={styles.faqQuestion}>Q. 영수증 재발행이 가능한가요?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: 'flex-1 bg-white',
  header: 'px-6 py-4 bg-white border-b border-gray-200',
  headerTitle: 'text-2xl font-bold text-gray-800',

  section: 'px-6 py-4 border-b border-gray-100',
  sectionHeader: 'flex flex-row justify-between items-center mb-4',
  sectionTitle: 'text-xl font-bold text-gray-800',
  moreButton: 'text-sm text-gray-500',

  noticeList: 'space-y-3',
  noticeItem: 'flex flex-row justify-between items-center py-2',
  noticeTitle: 'text-base text-gray-700',
  noticeDate: 'text-sm text-gray-500',

  eventScroll: 'flex-row',
  eventCard: 'mr-4 w-64',
  eventImagePlaceholder: 'w-64 h-32 bg-orange-100 rounded-xl flex items-center justify-center mb-2',
  eventImageText: 'text-orange-700 font-semibold',
  eventTitle: 'text-base font-medium text-gray-800 mt-2',

  faqList: 'space-y-3',
  faqItem: 'py-3 px-4 bg-gray-50 rounded-lg',
  faqQuestion: 'text-base text-gray-700',

  successScroll: 'flex-row',
  successCard: 'mr-4 w-64',
  successImagePlaceholder: 'w-64 h-32 bg-blue-100 rounded-xl flex items-center justify-center',
  successImageText: 'text-blue-700 font-semibold',
  successTitle: 'text-base font-medium text-gray-800 mt-2',
  successDesc: 'text-sm text-gray-600 mt-1',
};
