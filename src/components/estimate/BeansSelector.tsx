import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BeansType = 'house' | 'single' | 'premium' | 'custom';

interface BeansSelectorProps {
  selectedValue: BeansType | '';
  onSelect: (beans: BeansType) => void;
}

const beansOptions = [
  {
    id: 'house',
    title: '하우스 블렌드',
    price: 25000,
    description: '균형 잡힌 맛의 기본 블렌드',
    details: ['브라질 산토스 베이스', '콜롬비아 블렌딩', '중약배전', '초기 20kg 제공'],
  },
  {
    id: 'single',
    title: '싱글 오리진',
    price: 35000,
    description: '단일 산지의 특색있는 원두',
    details: ['에티오피아 예가체프', '과테말라 안티구아', '중배전', '초기 20kg 제공', '월 1회 산지 변경 가능'],
  },
  {
    id: 'premium',
    title: '프리미엄 블렌드',
    price: 45000,
    description: '고급 원두로 구성된 프리미엄 블렌드',
    details: ['파나마 게이샤', '하와이 코나', '자메이카 블루마운틴', '중약배전', '초기 20kg 제공', '월 1회 블렌딩 변경 가능'],
  },
  {
    id: 'custom',
    title: '커스텀 블렌드',
    price: 55000,
    description: '취향에 맞는 맞춤형 블렌드',
    details: ['원하는 원두 선택', '로스팅 강도 선택', '블렌딩 비율 조정', '초기 20kg 제공', '분기별 블렌딩 조정'],
  },
];

export default function BeansSelector({ selectedValue, onSelect }: BeansSelectorProps) {
  return (
    <ScrollView style={styles.container}>
      {beansOptions.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option.id as BeansType)} style={[styles.card, selectedValue === option.id && styles.selectedCard]}>
          <View style={styles.content}>
            <View style={styles.details}>
              <Text style={[styles.title, selectedValue === option.id && styles.selectedText]}>{option.title}</Text>
              <Text style={[styles.description, selectedValue === option.id && styles.selectedDescription]}>{option.description}</Text>
              <Text style={[styles.price, selectedValue === option.id && styles.selectedText]}>kg당 {option.price.toLocaleString()}원</Text>
              <View style={styles.detailsList}>
                {option.details.map((detail, index) => (
                  <View key={index} style={styles.detailItem}>
                    <View style={[styles.bullet, selectedValue === option.id && styles.selectedBullet]} />
                    <Text style={[styles.detailText, selectedValue === option.id && styles.selectedDescription]}>{detail}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCard: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 12,
  },
  selectedText: {
    color: '#ffffff',
  },
  selectedDescription: {
    color: '#bfdbfe',
  },
  detailsList: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4b5563',
  },
  selectedBullet: {
    backgroundColor: '#bfdbfe',
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
  },
});
