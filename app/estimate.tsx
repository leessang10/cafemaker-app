import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';
import { globalStyles } from './constants/theme';
import { Typography } from './components/Typography';

export default function EstimateScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <Typography variant="title">나만의 카페 견적 만들기</Typography>
        <Typography variant="body" style={styles.description}>
          단계별로 진행하여 나만의 카페 창업 견적을 만들어보세요.
        </Typography>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]}>
          <Typography style={styles.startButtonText}>시작하기</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
  },
});
