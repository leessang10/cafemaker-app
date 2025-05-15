import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MenuType = 'basic' | 'standard' | 'premium' | 'signature';

interface MenuSelectorProps {
  selectedValue: MenuType | '';
  onSelect: (menu: MenuType) => void;
}

const menuOptions = [
  {
    id: 'basic',
    title: '기본 메뉴',
    price: 3000000,
    description: '필수 메뉴로 구성된 기본 세트',
    details: ['에스프레소 기반 음료 8종', '티 베리에이션 4종', '스무디/프라페 4종', '베이커리 3종'],
  },
  {
    id: 'standard',
    title: '스탠다드 메뉴',
    price: 5000000,
    description: '다양한 메뉴로 구성된 기본 세트',
    details: ['에스프레소 기반 음료 12종', '티 베리에이션 6종', '스무디/프라페 6종', '베이커리 5종', '브런치 메뉴 3종'],
  },
  {
    id: 'premium',
    title: '프리미엄 메뉴',
    price: 8000000,
    description: '고급 메뉴로 구성된 프리미엄 세트',
    details: ['에스프레소 기반 음료 15종', '티 베리에이션 8종', '스무디/프라페 8종', '베이커리 8종', '브런치 메뉴 5종', '시그니처 디저트 3종'],
  },
  {
    id: 'signature',
    title: '시그니처 메뉴',
    price: 12000000,
    description: '독창적인 시그니처 메뉴 구성',
    details: ['프리미엄 메뉴 전체', '시즌별 스페셜 메뉴', '독창적 시그니처 음료 5종', '수제 디저트 5종', '브랜딩 컨설팅 포함'],
  },
];

export default function MenuSelector({ selectedValue, onSelect }: MenuSelectorProps) {
  return (
    <ScrollView style={styles.container}>
      {menuOptions.map((option) => (
        <TouchableOpacity key={option.id} onPress={() => onSelect(option.id as MenuType)} style={[styles.card, selectedValue === option.id && styles.selectedCard]}>
          <View style={styles.content}>
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
