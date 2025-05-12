import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MarketAnalysisPage() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://money-viewer.com/near-store/coffee-lab/address' }} style={{ flex: 1 }} />
    </View>
  );
}
