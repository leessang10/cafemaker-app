import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function MorePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Link href="/profile" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.menuText}>창업자 프로필</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/notice" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="#666" />
          <Text style={styles.menuText}>창업 공지사항</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/event" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="gift-outline" size={24} color="#666" />
          <Text style={styles.menuText}>창업 지원 프로그램</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/success" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="trophy-outline" size={24} color="#666" />
          <Text style={styles.menuText}>창업 성공사례</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/faq" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#666" />
          <Text style={styles.menuText}>창업 FAQ</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/consulting" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#666" />
          <Text style={styles.menuText}>1:1 창업 상담</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/terms" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="document-text-outline" size={24} color="#666" />
          <Text style={styles.menuText}>이용약관</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Link href="/settings" asChild>
        <Pressable style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.menuText}>설정</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </Link>

      <Pressable
        style={styles.menuItem}
        onPress={() => {
          router.push('/logout');
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#666" />
        <Text style={styles.menuText}>로그아웃</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});
