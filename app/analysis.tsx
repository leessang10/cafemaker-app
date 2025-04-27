import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function AnalysisScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: 'https://money-viewer.com/near-store/coffee-lab/address' }} style={styles.webview} />
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
