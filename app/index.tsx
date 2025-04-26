import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>배너 영역</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>상권 분석</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>창업 견적 만들기</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>창업 문의</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>창업 가이드</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>성공 사례</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>FAQ</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 18,
    color: '#333',
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
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});
