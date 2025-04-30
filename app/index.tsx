import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <ScrollView>
        <View style={[styles.bannerContainer, { backgroundColor: colors.primaryBg }]}>
          <Typography variant="title">배너 영역</Typography>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              상권 분석
            </Typography>
          </View>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              창업 견적 만들기
            </Typography>
          </View>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              창업 문의
            </Typography>
          </View>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              창업 가이드
            </Typography>
          </View>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              성공 사례
            </Typography>
          </View>
          <View style={styles.gridItem}>
            <Typography variant="subtitle" style={[styles.gridText, { backgroundColor: colors.primaryBg }]}>
              FAQ
            </Typography>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  gridItem: {
    width: '50%',
    padding: 10,
    aspectRatio: 1,
  },
  gridText: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    textAlign: 'center',
  },
});
