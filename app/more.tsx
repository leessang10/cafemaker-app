import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';

const menuItems = [
  { id: '1', title: '공지사항' },
  { id: '2', title: '이벤트' },
  { id: '3', title: '창업 가이드' },
  { id: '4', title: '성공 사례' },
  { id: '5', title: 'FAQ' },
  { id: '6', title: '창업 프로필 관리' },
  { id: '7', title: '저장한 견적/문의 목록' },
  { id: '8', title: '설정' },
  { id: '9', title: '로그아웃' },
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
            <Typography variant="body">{item.title}</Typography>
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
  },
});
