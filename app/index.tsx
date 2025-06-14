import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
import { supabase } from '../lib/supabase';

type FAQ = {
  id: string;
  title: string;
};

export default function HomePage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase.from('faqs').select('id, title').order('order_index', { ascending: true }).limit(3);

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  return (
    <ScrollView className={styles.container}>
      {/* 상단 헤더 */}
      <View className={styles.header}>
        <Text className={styles.headerTitle}>카페메이커</Text>
      </View>

      {/* 이벤트 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>창업 지원 프로그램</Text>
          <TouchableOpacity onPress={() => router.push('/event')}>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className={styles.eventScroll} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className={styles.eventCard} onPress={() => router.push('/event/1')}>
            <View className={styles.eventImagePlaceholder}>
              <Text className={styles.eventImageText}>창업 컨설팅</Text>
            </View>
            <Text className={styles.eventTitle}>무료 창업 컨설팅 진행중</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.eventCard} onPress={() => router.push('/event/2')}>
            <View className={styles.eventImagePlaceholder}>
              <Text className={styles.eventImageText}>인테리어</Text>
            </View>
            <Text className={styles.eventTitle}>인테리어 특별 패키지</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 공지사항 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>공지사항</Text>
          <TouchableOpacity onPress={() => router.push('/notice')}>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View className={styles.noticeList}>
          <TouchableOpacity className={styles.noticeItem} onPress={() => router.push('/notice/1')}>
            <Text className={styles.noticeTitle}>2024년 창업 지원금 안내</Text>
            <Text className={styles.noticeDate}>2024.04.10</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.noticeItem} onPress={() => router.push('/notice/2')}>
            <Text className={styles.noticeTitle}>신규 창업자 교육 프로그램 오픈</Text>
            <Text className={styles.noticeDate}>2024.04.08</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.noticeItem} onPress={() => router.push('/notice/3')}>
            <Text className={styles.noticeTitle}>4월 창업 세미나 일정 안내</Text>
            <Text className={styles.noticeDate}>2024.04.05</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 성공사례 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>창업 성공사례</Text>
          <TouchableOpacity onPress={() => router.push('/success')}>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className={styles.successScroll} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity className={styles.successCard} onPress={() => router.push('/success/1')}>
            <View className={styles.successImagePlaceholder}>
              <Text className={styles.successImageText}>서울 강남점</Text>
            </View>
            <Text className={styles.successTitle}>월 매출 5천만원 달성</Text>
            <Text className={styles.successDesc}>6개월 만에 흑자 전환 성공</Text>
          </TouchableOpacity>
          <TouchableOpacity className={styles.successCard} onPress={() => router.push('/success/2')}>
            <View className={styles.successImagePlaceholder}>
              <Text className={styles.successImageText}>부산 해운대점</Text>
            </View>
            <Text className={styles.successTitle}>객단가 2배 상승</Text>
            <Text className={styles.successDesc}>프리미엄 카페 전환 성공사례</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* FAQ 섹션 */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>창업 FAQ</Text>
          <TouchableOpacity onPress={() => router.push('/faq')}>
            <Text className={styles.moreButton}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View className={styles.faqList}>
          {faqs.map((faq) => (
            <TouchableOpacity key={faq.id} className={styles.faqItem} onPress={() => router.push(`/faq/${faq.id}`)}>
              <Text className={styles.faqQuestion}>Q. {faq.title}</Text>
            </TouchableOpacity>
          ))}
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
