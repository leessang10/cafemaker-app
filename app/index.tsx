import { Text, View } from 'react-native';
import '../global.css';

export default function HomePage() {
  return (
    <View className={styles.container}>
      <Text className={styles.text}>홈</Text>
    </View>
  );
}

const styles = {
  container: 'flex-1 items-center justify-center bg-white',
  text: 'text-4xl font-bold',
};
