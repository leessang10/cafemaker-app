import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = 'notifications' | 'gift' | 'book' | 'trophy' | 'help-circle' | 'person' | 'bookmark' | 'settings' | 'log-out' | 'chevron-forward';

const menuItems: { id: string; title: string; icon: IoniconsName }[] = [
  { id: '1', title: '공지사항', icon: 'notifications' },
  { id: '2', title: '이벤트', icon: 'gift' },
  { id: '3', title: '창업 가이드', icon: 'book' },
  { id: '4', title: '성공 사례', icon: 'trophy' },
  { id: '5', title: 'FAQ', icon: 'help-circle' },
  { id: '6', title: '창업 프로필 관리', icon: 'person' },
  { id: '7', title: '저장한 견적/문의 목록', icon: 'bookmark' },
  { id: '8', title: '설정', icon: 'settings' },
  { id: '9', title: '로그아웃', icon: 'log-out' },
];

export default function MoreScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={[styles.header, { borderBottomColor: colors.primaryLight }]}>
        <Typography variant="title">더보기</Typography>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.primaryLight }]}>
            <View style={styles.menuItemContent}>
              <Ionicons name={item.icon} size={20} color={colors.primary} style={styles.menuIcon} />
              <Typography variant="body">{item.title}</Typography>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.gray400} />
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
  listContainer: {
    padding: 10,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
});
