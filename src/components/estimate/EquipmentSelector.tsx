import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type EquipmentType = 'basic' | 'standard' | 'premium' | 'custom';

interface EquipmentSelectorProps {
  selectedValue: EquipmentType | '';
  onSelect: (equipment: EquipmentType) => void;
}

const equipmentOptions = [
  {
    id: 'basic',
    title: '기본 패키지',
    price: 25000000,
    description: '소규모 카페 운영에 필요한 기본 장비',
    details: ['에스프레소 머신 (2구)', '그라인더 1대', '제빙기 1대', '냉장고 1대', '기본 소도구'],
  },
  {
    id: 'standard',
    title: '스탠다드 패키지',
    price: 35000000,
    description: '중규모 카페 운영을 위한 표준 장비',
    details: ['에스프레소 머신 (3구)', '그라인더 2대', '제빙기 1대', '냉장고 2대', '온수기', '블렌더'],
  },
  {
    id: 'premium',
    title: '프리미엄 패키지',
    price: 50000000,
    description: '대규모 전문 카페를 위한 고급 장비',
    details: ['에스프레소 머신 (4구)', '그라인더 3대', '제빙기 2대', '냉장고 3대', '온수기', '블렌더 2대', '오븐'],
  },
  {
    id: 'custom',
    title: '커스텀 패키지',
    price: 0,
    description: '필요한 장비만 선택하여 구성',
    details: ['상담을 통한 맞춤 구성', '브랜드/사양 선택 가능', '설치 및 교육 지원', '유지보수 계약 가능'],
  },
];

export default function EquipmentSelector({ selectedValue, onSelect }: EquipmentSelectorProps) {
  return (
    <ScrollView style={styles.container}>
      {equipmentOptions.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option.id as EquipmentType)} style={[styles.card, selectedValue === option.id && styles.selectedCard]}>
          <View style={styles.content}>
            <View style={styles.details}>
              <Text style={[styles.title, selectedValue === option.id && styles.selectedText]}>{option.title}</Text>
              <Text style={[styles.description, selectedValue === option.id && styles.selectedDescription]}>{option.description}</Text>
              <Text style={[styles.price, selectedValue === option.id && styles.selectedText]}>{option.price > 0 ? `${option.price.toLocaleString()}원` : '상담 필요'}</Text>
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
