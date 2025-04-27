import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { MONEY_VIEWER_URL } from '@env';

export default function AnalysisScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: MONEY_VIEWER_URL }} style={styles.webview} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});
