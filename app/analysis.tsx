import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MONEY_VIEWER_URL } from '@env';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';

export default function AnalysisScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container]} edges={['left', 'right', 'top']}>
      <WebView source={{ uri: MONEY_VIEWER_URL }} style={styles.webview} backgroundColor={colors.background} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
  },
});
