import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const MOCK_FAQS = [
  { id: 1, title: 'FAQ 1' },
  { id: 2, title: 'FAQ 2' },
  { id: 3, title: 'FAQ 3' },
];

export default function FAQListPage() {
  return (
    <View>
      <Text>FAQ 목록</Text>
      {MOCK_FAQS.map((faq) => (
        <Link key={faq.id} href={`/faq/${faq.id}`} asChild>
          <Pressable>
            <Text>{faq.title}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
