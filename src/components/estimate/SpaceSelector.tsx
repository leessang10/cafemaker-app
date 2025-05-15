import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SpaceType = 'small' | 'medium' | 'large' | 'xl';

interface SpaceSelectorProps {
  selectedValue: SpaceType | '';
  onSelect: (space: SpaceType) => void;
}

const spaceOptions = [
  {
    id: 'small',
    title: '소형 (10평 이하)',
    price: 30000000,
    description: '아담하고 효율적인 공간',
    icon: '🏠',
    details: ['테이블 4-6개', '1일 30-50명 수용', '직원 1-2명 운영'],
  },
  {
    id: 'medium',
    title: '중형 (11-20평)',
    price: 50000000,
    description: '편안한 규모의 카페',
    icon: '🏡',
    details: ['테이블 8-12개', '1일 80-120명 수용', '직원 2-3명 운영'],
  },
  {
    id: 'large',
    title: '대형 (21-30평)',
    price: 80000000,
    description: '여유로운 공간 활용',
    icon: '🏢',
    details: ['테이블 15-20개', '1일 150-200명 수용', '직원 4-5명 운영'],
  },
  {
    id: 'xl',
    title: '특대형 (31평 이상)',
    price: 120000000,
    description: '대규모 프랜차이즈급',
    icon: '🏰',
    details: ['테이블 25개 이상', '1일 300명 이상 수용', '직원 6명 이상 운영'],
  },
];

export default function SpaceSelector({ selectedValue, onSelect }: SpaceSelectorProps) {
  return (
    <ScrollView style={styles.container}>
      {spaceOptions.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option.id as SpaceType)} style={[styles.card, selectedValue === option.id && styles.selectedCard]}>
          <View style={styles.content}>
            <Text style={styles.icon}>{option.icon}</Text>
            <View style={styles.details}>
              <Text style={[styles.title, selectedValue === option.id && styles.selectedText]}>{option.title}</Text>
              <Text style={[styles.description, selectedValue === option.id && styles.selectedDescription]}>{option.description}</Text>
              <Text style={[styles.price, selectedValue === option.id && styles.selectedText]}>{option.price.toLocaleString()}원</Text>
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
    gap: 12,
  },
  icon: {
    fontSize: 32,
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
