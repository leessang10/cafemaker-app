import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type InteriorType = 'minimal' | 'industrial' | 'natural' | 'luxury';

interface InteriorSelectorProps {
  selectedValue: InteriorType | '';
  onSelect: (interior: InteriorType) => void;
}

const interiorOptions = [
  {
    id: 'minimal',
    title: '미니멀',
    price: 800000,
    description: '심플하고 모던한 디자인',
    details: ['깔끔한 화이트 톤', '기하학적 디자인', '효율적인 공간 활용'],
  },
  {
    id: 'industrial',
    title: '인더스트리얼',
    price: 1000000,
    description: '도시적이고 세련된 분위기',
    details: ['노출 콘크리트', '메탈 소재 활용', '파이프 장식'],
  },
  {
    id: 'natural',
    title: '내추럴',
    price: 900000,
    description: '따뜻하고 편안한 분위기',
    details: ['우드 소재', '식물 인테리어', '자연 채광'],
  },
  {
    id: 'luxury',
    title: '럭셔리',
    price: 1500000,
    description: '고급스럽고 세련된 공간',
    details: ['대리석 마감', '고급 조명', '맞춤 가구'],
  },
];

export default function InteriorSelector({ selectedValue, onSelect }: InteriorSelectorProps) {
  return (
    <ScrollView style={styles.container}>
      {interiorOptions.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option.id as InteriorType)} style={[styles.card, selectedValue === option.id && styles.selectedCard]}>
          <View style={styles.content}>
            <View style={styles.details}>
              <Text style={[styles.title, selectedValue === option.id && styles.selectedText]}>{option.title}</Text>
              <Text style={[styles.description, selectedValue === option.id && styles.selectedDescription]}>{option.description}</Text>
              <Text style={[styles.price, selectedValue === option.id && styles.selectedText]}>평당 {option.price.toLocaleString()}원</Text>
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
