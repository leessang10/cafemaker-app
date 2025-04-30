import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MONEY_VIEWER_URL } from '@env';
import { useTheme } from './context/ThemeContext';
import { globalStyles } from './constants/theme';

export default function AnalysisScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <WebView source={{ uri: MONEY_VIEWER_URL }} style={styles.webview} backgroundColor={colors.background} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});
