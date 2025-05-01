import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type InquiryStatus = 'pending' | 'in_progress' | 'completed';

interface Inquiry {
  id: string;
  title: string;
  date: string;
  status: InquiryStatus;
  lastMessage?: string;
  unreadCount?: number;
}

const dummyInquiries: Inquiry[] = [
  {
    id: '1',
    title: '카페 창업 문의',
    date: '2024-04-26',
    status: 'in_progress',
    lastMessage: '안녕하세요, 창업 문의드립니다.',
    unreadCount: 2,
  },
  {
    id: '2',
    title: '원두 공급 문의',
    date: '2024-04-25',
    status: 'completed',
    lastMessage: '감사합니다. 좋은 하루 되세요.',
    unreadCount: 0,
  },
];

const getStatusColor = (status: InquiryStatus, colors: any) => {
  switch (status) {
    case 'pending':
      return colors.warning;
    case 'in_progress':
      return colors.primary;
    case 'completed':
      return colors.success;
    default:
      return colors.text;
  }
};

const getStatusText = (status: InquiryStatus) => {
  switch (status) {
    case 'pending':
      return '대기중';
    case 'in_progress':
      return '진행중';
    case 'completed':
      return '완료';
    default:
      return '';
  }
};

export default function InquiryScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>(dummyInquiries);

  const onRefresh = () => {
    setRefreshing(true);
    // TODO: 실제 API 호출로 대체
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNewInquiry = () => {
    // TODO: 새 문의 작성 화면으로 이동
  };

  const handleInquiryPress = (inquiry: Inquiry) => {
    // TODO: 채팅방으로 이동
  };

  return (
    <SafeAreaView style={[globalStyles.container]} edges={['left', 'right', 'top']}>
      <View style={[styles.header, { borderBottomColor: colors.primaryLight }]}>
        <Typography variant="title">창업 문의</Typography>
        <TouchableOpacity style={[styles.newInquiryButton, { backgroundColor: colors.primary }]} onPress={handleNewInquiry}>
          <Ionicons name="add" size={20} color="#fff" />
          <Typography style={styles.newInquiryButtonText}>새 문의 작성</Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        data={inquiries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.inquiryItem, { borderBottomColor: colors.primaryLight }]} onPress={() => handleInquiryPress(item)}>
            <View style={styles.inquiryHeader}>
              <Typography variant="body" style={styles.inquiryTitle}>
                {item.title}
              </Typography>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status, colors) }]}>
                <Typography style={styles.statusText}>{getStatusText(item.status)}</Typography>
              </View>
            </View>
            {item.lastMessage && (
              <Typography variant="caption" style={styles.lastMessage}>
                {item.lastMessage}
              </Typography>
            )}
            <View style={styles.inquiryFooter}>
              <Typography variant="caption">{item.date}</Typography>
              {item.unreadCount && item.unreadCount > 0 && (
                <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                  <Typography style={styles.unreadText}>{item.unreadCount}</Typography>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
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
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 5,
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
    gap: 8,
  },
  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inquiryTitle: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  lastMessage: {
    color: '#666',
  },
  inquiryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
});
