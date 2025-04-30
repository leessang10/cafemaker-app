import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@src/context/ThemeContext';
import { globalStyles } from '@src/constants/theme';
import Typography from '@src/components/Typography';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Step = 'basic' | 'interior' | 'equipment' | 'labor' | 'material' | 'summary';

interface BasicInfo {
  location: string;
  size: string;
  monthlyRent: number;
}

interface InteriorOption {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  image: string;
  description: string;
}

interface InteriorInfo {
  basicOptions: InteriorOption[];
  customOptions: InteriorOption[];
  totalPrice: number;
}

interface EquipmentOption {
  id: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  selected: boolean;
  description: string;
  image: string;
}

interface EquipmentInfo {
  coffeeMachines: EquipmentOption[];
  grinders: EquipmentOption[];
  refrigerators: EquipmentOption[];
  others: EquipmentOption[];
  totalPrice: number;
  [key: string]: EquipmentOption[] | number;
}

interface LaborInfo {
  baristaCount: number;
  baristaSalary: number;
  partTimeCount: number;
  partTimeSalary: number;
  totalMonthlyLaborCost: number;
}

interface CoffeeBeanOption {
  id: string;
  name: string;
  brand: string;
  price: number;
  selected: boolean;
  description: string;
  image: string;
}

interface MaterialInfo {
  coffeeBeans: CoffeeBeanOption[];
  milk: number;
  syrup: number;
  cups: number;
  totalMonthlyMaterialCost: number;
}

interface SummaryInfo {
  totalInitialCost: number;
  totalMonthlyCost: number;
  breakEvenPoint: number;
}

export default function EstimateScreen() {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    location: '',
    size: '',
    monthlyRent: 0,
  });
  const [interiorInfo, setInteriorInfo] = useState<InteriorInfo>({
    basicOptions: [
      {
        id: 'modern',
        name: '모던 스타일',
        price: 10000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500',
        description: '깔끔하고 세련된 모던 스타일의 인테리어',
      },
      {
        id: 'industrial',
        name: '인더스트리얼',
        price: 8000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        description: '거친 소재와 노출된 구조물이 특징인 인더스트리얼 스타일',
      },
      {
        id: 'vintage',
        name: '빈티지',
        price: 12000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500',
        description: '클래식하고 따뜻한 분위기의 빈티지 스타일',
      },
      {
        id: 'minimal',
        name: '미니멀',
        price: 9000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
        description: '단순하고 깔끔한 미니멀 스타일',
      },
    ],
    customOptions: [
      {
        id: 'counter',
        name: '카운터 디자인',
        price: 2000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500',
        description: '프리미엄 카운터 디자인',
      },
      {
        id: 'furniture',
        name: '테이블/의자',
        price: 3000000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        description: '고급스러운 테이블과 의자 세트',
      },
      {
        id: 'lighting',
        name: '조명',
        price: 1500000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        description: '분위기 있는 조명 시스템',
      },
      {
        id: 'wall',
        name: '벽면 디자인',
        price: 2500000,
        selected: false,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        description: '특별한 벽면 디자인',
      },
    ],
    totalPrice: 0,
  });
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentInfo>({
    coffeeMachines: [
      {
        id: 'cm1',
        category: 'coffeeMachine',
        name: '라 마르조코 GS3',
        brand: 'La Marzocco',
        price: 15000000,
        selected: false,
        description: '1그룹, 2L 보일러, PID 컨트롤',
        image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500',
      },
      {
        id: 'cm2',
        category: 'coffeeMachine',
        name: '누오바 시몬넬리 아펠리아 II',
        brand: 'Nuova Simonelli',
        price: 8000000,
        selected: false,
        description: '1그룹, 1.8L 보일러, PID 컨트롤',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
    ],
    grinders: [
      {
        id: 'g1',
        category: 'grinder',
        name: '마제르 K30',
        brand: 'Mahlkönig',
        price: 3000000,
        selected: false,
        description: '64mm 플랫 버, 1.4kg 호퍼',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
      {
        id: 'g2',
        category: 'grinder',
        name: '누오바 시몬넬리 MDX',
        brand: 'Nuova Simonelli',
        price: 2500000,
        selected: false,
        description: '65mm 플랫 버, 1.2kg 호퍼',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
    ],
    refrigerators: [
      {
        id: 'r1',
        category: 'refrigerator',
        name: 'LG 디오스',
        brand: 'LG',
        price: 2000000,
        selected: false,
        description: '2도어, 600L, 냉장/냉동',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500',
      },
      {
        id: 'r2',
        category: 'refrigerator',
        name: '삼성 비스포크',
        brand: 'Samsung',
        price: 2500000,
        selected: false,
        description: '2도어, 700L, 냉장/냉동',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500',
      },
    ],
    others: [
      {
        id: 'o1',
        category: 'other',
        name: '블렌더',
        brand: 'Vitamix',
        price: 1000000,
        selected: false,
        description: '프로페셔널급 블렌더',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
      {
        id: 'o2',
        category: 'other',
        name: 'POS 시스템',
        brand: 'KICC',
        price: 1500000,
        selected: false,
        description: '기본 POS 시스템',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
    ],
    totalPrice: 0,
  });

  const [laborInfo, setLaborInfo] = useState<LaborInfo>({
    baristaCount: 1,
    baristaSalary: 3000000,
    partTimeCount: 2,
    partTimeSalary: 1500000,
    totalMonthlyLaborCost: 6000000,
  });

  const [materialInfo, setMaterialInfo] = useState<MaterialInfo>({
    coffeeBeans: [
      {
        id: 'cb1',
        name: '에티오피아 예가체프',
        brand: 'Starbucks',
        price: 50000,
        selected: false,
        description: '과일향이 풍부한 에티오피아 원두',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
      {
        id: 'cb2',
        name: '콜롬비아 수프리모',
        brand: 'Blue Bottle',
        price: 45000,
        selected: false,
        description: '균형잡힌 바디감의 콜롬비아 원두',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
      {
        id: 'cb3',
        name: '케냐 AA',
        brand: 'Illy',
        price: 55000,
        selected: false,
        description: '산미가 강한 케냐 원두',
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500',
      },
    ],
    milk: 300000,
    syrup: 200000,
    cups: 100000,
    totalMonthlyMaterialCost: 1100000,
  });

  const [summaryInfo, setSummaryInfo] = useState<SummaryInfo>({
    totalInitialCost: 0,
    totalMonthlyCost: 0,
    breakEvenPoint: 0,
  });

  const steps: { id: Step; title: string; icon: string }[] = [
    { id: 'basic', title: '기본 정보', icon: 'information-circle' },
    { id: 'interior', title: '인테리어', icon: 'home' },
    { id: 'equipment', title: '장비', icon: 'cafe' },
    { id: 'labor', title: '인건비', icon: 'people' },
    { id: 'material', title: '원재료', icon: 'cart' },
    { id: 'summary', title: '총 견적', icon: 'calculator' },
  ];

  const renderBasicInfoForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Typography variant="body" style={styles.label}>
          카페 위치
        </Typography>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="예: 서울시 강남구" value={basicInfo.location} onChangeText={(text) => setBasicInfo({ ...basicInfo, location: text })} />
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Typography variant="body" style={styles.label}>
          카페 크기
        </Typography>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="예: 30평" value={basicInfo.size} onChangeText={(text) => setBasicInfo({ ...basicInfo, size: text })} keyboardType="numeric" />
          <Typography variant="caption" style={styles.unit}>
            평
          </Typography>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Typography variant="body" style={styles.label}>
          예상 월세
        </Typography>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="예: 300"
            value={basicInfo.monthlyRent.toString()}
            onChangeText={(text) => setBasicInfo({ ...basicInfo, monthlyRent: parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <Typography variant="caption" style={styles.unit}>
            만원
          </Typography>
        </View>
      </View>

      <View style={styles.tipContainer}>
        <Ionicons name="information-circle" size={16} color={colors.primary} />
        <Typography variant="caption" style={styles.tipText}>
          정확한 정보를 입력하시면 더 정확한 견적을 받으실 수 있어요.
        </Typography>
      </View>
    </View>
  );

  const renderInteriorForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          기본 인테리어 스타일을 선택해주세요
        </Typography>
        <View style={styles.gridContainer}>
          {interiorInfo.basicOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.gridItem, option.selected && styles.selectedGridItem]}
              onPress={() => {
                const updatedOptions = interiorInfo.basicOptions.map((item) => (item.id === option.id ? { ...item, selected: !item.selected } : { ...item, selected: false }));
                setInteriorInfo({
                  ...interiorInfo,
                  basicOptions: updatedOptions,
                  totalPrice: calculateTotalPrice(updatedOptions, interiorInfo.customOptions),
                });
              }}
            >
              <Image source={{ uri: option.image }} style={styles.gridImage} />
              <View style={styles.gridContent}>
                <Typography variant="body" style={styles.gridTitle}>
                  {option.name}
                </Typography>
                <Typography variant="caption" style={styles.gridDescription}>
                  {option.description}
                </Typography>
                <Typography variant="body" style={styles.gridPrice}>
                  {formatPrice(option.price)}
                </Typography>
              </View>
              {option.selected && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          추가 옵션을 선택해주세요
        </Typography>
        <View style={styles.gridContainer}>
          {interiorInfo.customOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.gridItem, option.selected && styles.selectedGridItem]}
              onPress={() => {
                const updatedOptions = interiorInfo.customOptions.map((item) => (item.id === option.id ? { ...item, selected: !item.selected } : item));
                setInteriorInfo({
                  ...interiorInfo,
                  customOptions: updatedOptions,
                  totalPrice: calculateTotalPrice(interiorInfo.basicOptions, updatedOptions),
                });
              }}
            >
              <Image source={{ uri: option.image }} style={styles.gridImage} />
              <View style={styles.gridContent}>
                <Typography variant="body" style={styles.gridTitle}>
                  {option.name}
                </Typography>
                <Typography variant="caption" style={styles.gridDescription}>
                  {option.description}
                </Typography>
                <Typography variant="body" style={styles.gridPrice}>
                  {formatPrice(option.price)}
                </Typography>
              </View>
              {option.selected && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Typography variant="subtitle" style={{ color: '#FFFFFF', fontWeight: '600' }}>
          총 인테리어 비용
        </Typography>
        <Typography variant="title" style={styles.totalPrice}>
          {formatPrice(interiorInfo.totalPrice)}
        </Typography>
      </View>
    </View>
  );

  const calculateTotalPrice = (basicOptions: InteriorOption[], customOptions: InteriorOption[]) => {
    return [...basicOptions, ...customOptions].filter((option) => option.selected).reduce((total, option) => total + option.price, 0);
  };

  const formatPrice = (price: number) => {
    return `${(price / 10000).toLocaleString()}만원`;
  };

  const renderEquipmentForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          필요한 장비를 선택해주세요
        </Typography>
        <View style={styles.equipmentList}>
          {equipmentInfo.coffeeMachines.map((equipment) => (
            <TouchableOpacity key={equipment.id} style={[styles.equipmentItem, equipment.selected && { borderColor: colors.primary }]} onPress={() => toggleEquipmentSelection(equipment)}>
              <Image source={{ uri: equipment.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentContent}>
                <Typography variant="body" style={styles.equipmentName}>
                  {equipment.brand} {equipment.name}
                </Typography>
                <Typography variant="caption" style={styles.equipmentDescription}>
                  {equipment.description}
                </Typography>
                <Typography variant="body" style={styles.equipmentPrice}>
                  {formatPrice(equipment.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, equipment.selected && { backgroundColor: colors.primary }]}>{equipment.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          그라인더
        </Typography>
        <View style={styles.equipmentList}>
          {equipmentInfo.grinders.map((equipment) => (
            <TouchableOpacity key={equipment.id} style={[styles.equipmentItem, equipment.selected && { borderColor: colors.primary }]} onPress={() => toggleEquipmentSelection(equipment)}>
              <Image source={{ uri: equipment.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentContent}>
                <Typography variant="body" style={styles.equipmentName}>
                  {equipment.brand} {equipment.name}
                </Typography>
                <Typography variant="caption" style={styles.equipmentDescription}>
                  {equipment.description}
                </Typography>
                <Typography variant="body" style={styles.equipmentPrice}>
                  {formatPrice(equipment.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, equipment.selected && { backgroundColor: colors.primary }]}>{equipment.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          냉장고/냉동고
        </Typography>
        <View style={styles.equipmentList}>
          {equipmentInfo.refrigerators.map((equipment) => (
            <TouchableOpacity key={equipment.id} style={[styles.equipmentItem, equipment.selected && { borderColor: colors.primary }]} onPress={() => toggleEquipmentSelection(equipment)}>
              <Image source={{ uri: equipment.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentContent}>
                <Typography variant="body" style={styles.equipmentName}>
                  {equipment.brand} {equipment.name}
                </Typography>
                <Typography variant="caption" style={styles.equipmentDescription}>
                  {equipment.description}
                </Typography>
                <Typography variant="body" style={styles.equipmentPrice}>
                  {formatPrice(equipment.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, equipment.selected && { backgroundColor: colors.primary }]}>{equipment.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          기타 장비
        </Typography>
        <View style={styles.equipmentList}>
          {equipmentInfo.others.map((equipment) => (
            <TouchableOpacity key={equipment.id} style={[styles.equipmentItem, equipment.selected && { borderColor: colors.primary }]} onPress={() => toggleEquipmentSelection(equipment)}>
              <Image source={{ uri: equipment.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentContent}>
                <Typography variant="body" style={styles.equipmentName}>
                  {equipment.brand} {equipment.name}
                </Typography>
                <Typography variant="caption" style={styles.equipmentDescription}>
                  {equipment.description}
                </Typography>
                <Typography variant="body" style={styles.equipmentPrice}>
                  {formatPrice(equipment.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, equipment.selected && { backgroundColor: colors.primary }]}>{equipment.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Typography variant="subtitle">총 장비 비용</Typography>
        <Typography variant="title" style={styles.totalPrice}>
          {formatPrice(equipmentInfo.totalPrice)}
        </Typography>
      </View>
    </View>
  );

  const toggleEquipmentSelection = (equipment: EquipmentOption) => {
    const category = equipment.category;
    const updatedEquipment = {
      ...equipmentInfo,
      [category]: (equipmentInfo[category] as EquipmentOption[]).map((item: EquipmentOption) => (item.id === equipment.id ? { ...item, selected: !item.selected } : item)),
    };
    const totalPrice = calculateEquipmentTotalPrice(updatedEquipment);
    setEquipmentInfo({ ...updatedEquipment, totalPrice });
  };

  const calculateEquipmentTotalPrice = (equipment: EquipmentInfo) => {
    return [...equipment.coffeeMachines, ...equipment.grinders, ...equipment.refrigerators, ...equipment.others].filter((item) => item.selected).reduce((total, item) => total + item.price, 0);
  };

  const renderLaborForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          바리스타 인원을 설정해주세요
        </Typography>
        <View style={styles.inputGroup}>
          <Typography variant="body" style={styles.label}>
            인원 수
          </Typography>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, laborInfo.baristaCount <= 1 && styles.disabledButton]}
              onPress={() => {
                if (laborInfo.baristaCount > 1) {
                  setLaborInfo({
                    ...laborInfo,
                    baristaCount: laborInfo.baristaCount - 1,
                    totalMonthlyLaborCost: (laborInfo.baristaCount - 1) * laborInfo.baristaSalary + laborInfo.partTimeCount * laborInfo.partTimeSalary,
                  });
                }
              }}
            >
              <Ionicons name="remove" size={20} color={laborInfo.baristaCount <= 1 ? '#ccc' : colors.primary} />
            </TouchableOpacity>
            <View style={styles.counterDisplay}>
              <View style={styles.iconContainer}>
                {Array(laborInfo.baristaCount)
                  .fill(0)
                  .map((_, index) => (
                    <Ionicons key={index} name="person" size={24} color={colors.primary} style={styles.counterIcon} />
                  ))}
              </View>
              <Typography variant="caption" style={styles.counterNumber}>
                {laborInfo.baristaCount}명
              </Typography>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => {
                setLaborInfo({
                  ...laborInfo,
                  baristaCount: laborInfo.baristaCount + 1,
                  totalMonthlyLaborCost: (laborInfo.baristaCount + 1) * laborInfo.baristaSalary + laborInfo.partTimeCount * laborInfo.partTimeSalary,
                });
              }}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Typography variant="body" style={styles.label}>
            월급
          </Typography>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={laborInfo.baristaSalary.toLocaleString()}
              onChangeText={(text) => {
                const salary = parseInt(text.replace(/,/g, '')) || 0;
                setLaborInfo({
                  ...laborInfo,
                  baristaSalary: salary,
                  totalMonthlyLaborCost: laborInfo.baristaCount * salary + laborInfo.partTimeCount * laborInfo.partTimeSalary,
                });
              }}
              keyboardType="numeric"
            />
            <Typography variant="caption" style={styles.unit}>
              원
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          아르바이트 인원을 설정해주세요
        </Typography>
        <View style={styles.inputGroup}>
          <Typography variant="body" style={styles.label}>
            인원 수
          </Typography>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={[styles.counterButton, laborInfo.partTimeCount <= 0 && styles.disabledButton]}
              onPress={() => {
                if (laborInfo.partTimeCount > 0) {
                  setLaborInfo({
                    ...laborInfo,
                    partTimeCount: laborInfo.partTimeCount - 1,
                    totalMonthlyLaborCost: laborInfo.baristaCount * laborInfo.baristaSalary + (laborInfo.partTimeCount - 1) * laborInfo.partTimeSalary,
                  });
                }
              }}
            >
              <Ionicons name="remove" size={20} color={laborInfo.partTimeCount <= 0 ? '#ccc' : colors.primary} />
            </TouchableOpacity>
            <View style={styles.counterDisplay}>
              <View style={styles.iconContainer}>
                {Array(laborInfo.partTimeCount)
                  .fill(0)
                  .map((_, index) => (
                    <Ionicons key={index} name="person-outline" size={24} color={colors.primary} style={styles.counterIcon} />
                  ))}
              </View>
              <Typography variant="caption" style={styles.counterNumber}>
                {laborInfo.partTimeCount}명
              </Typography>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => {
                setLaborInfo({
                  ...laborInfo,
                  partTimeCount: laborInfo.partTimeCount + 1,
                  totalMonthlyLaborCost: laborInfo.baristaCount * laborInfo.baristaSalary + (laborInfo.partTimeCount + 1) * laborInfo.partTimeSalary,
                });
              }}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Typography variant="body" style={styles.label}>
            월급
          </Typography>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={laborInfo.partTimeSalary.toLocaleString()}
              onChangeText={(text) => {
                const salary = parseInt(text.replace(/,/g, '')) || 0;
                setLaborInfo({
                  ...laborInfo,
                  partTimeSalary: salary,
                  totalMonthlyLaborCost: laborInfo.baristaCount * laborInfo.baristaSalary + laborInfo.partTimeCount * salary,
                });
              }}
              keyboardType="numeric"
            />
            <Typography variant="caption" style={styles.unit}>
              원
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Typography variant="subtitle" style={{ color: '#FFFFFF', fontWeight: '600' }}>
          월 인건비 총액
        </Typography>
        <Typography variant="title" style={styles.totalPrice}>
          {laborInfo.totalMonthlyLaborCost.toLocaleString()}원
        </Typography>
      </View>
    </View>
  );

  const toggleCoffeeBeanSelection = (bean: CoffeeBeanOption) => {
    const updatedBeans = materialInfo.coffeeBeans.map((item) => ({
      ...item,
      selected: item.id === bean.id ? !item.selected : false,
    }));
    setMaterialInfo({
      ...materialInfo,
      coffeeBeans: updatedBeans,
    });
  };

  const renderMaterialForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          원두를 선택해주세요
        </Typography>
        <View style={styles.equipmentList}>
          {materialInfo.coffeeBeans.map((bean) => (
            <TouchableOpacity key={bean.id} style={[styles.equipmentItem, bean.selected && { borderColor: colors.primary }]} onPress={() => toggleCoffeeBeanSelection(bean)}>
              <Image source={{ uri: bean.image }} style={styles.equipmentImage} />
              <View style={styles.equipmentContent}>
                <Typography variant="body" style={styles.equipmentName}>
                  {bean.brand} {bean.name}
                </Typography>
                <Typography variant="caption" style={styles.equipmentDescription}>
                  {bean.description}
                </Typography>
                <Typography variant="body" style={styles.equipmentPrice}>
                  {formatPrice(bean.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, bean.selected && { backgroundColor: colors.primary }]}>{bean.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Typography variant="subtitle" style={{ color: '#FFFFFF', fontWeight: '600' }}>
          월 원재료비 총액
        </Typography>
        <Typography variant="title" style={styles.totalPrice}>
          {materialInfo.totalMonthlyMaterialCost.toLocaleString()}원
        </Typography>
      </View>
    </View>
  );

  const renderSummary = () => {
    const totalInitialCost = Number(interiorInfo.totalPrice) + Number(equipmentInfo.totalPrice);
    const totalMonthlyCost = Number(basicInfo.monthlyRent) + Number(laborInfo.totalMonthlyLaborCost) + Number(materialInfo.totalMonthlyMaterialCost);

    return (
      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Typography variant="subtitle" style={styles.sectionTitle}>
            초기 투자 비용을 확인해주세요
          </Typography>
          <View style={styles.summaryItem}>
            <Typography variant="body">인테리어</Typography>
            <Typography variant="body">{formatPrice(interiorInfo.totalPrice)}</Typography>
          </View>
          <View style={styles.summaryItem}>
            <Typography variant="body">장비</Typography>
            <Typography variant="body">{formatPrice(equipmentInfo.totalPrice)}</Typography>
          </View>
          <View style={[styles.summaryItem, styles.summaryTotal]}>
            <Typography variant="subtitle">총 초기 투자 비용</Typography>
            <Typography variant="title" style={styles.totalPrice}>
              {formatPrice(totalInitialCost)}
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="subtitle" style={styles.sectionTitle}>
            월 운영 비용을 확인해주세요
          </Typography>
          <View style={styles.summaryItem}>
            <Typography variant="body">월세</Typography>
            <Typography variant="body">{formatPrice(basicInfo.monthlyRent)}</Typography>
          </View>
          <View style={styles.summaryItem}>
            <Typography variant="body">인건비</Typography>
            <Typography variant="body">{formatPrice(laborInfo.totalMonthlyLaborCost)}</Typography>
          </View>
          <View style={styles.summaryItem}>
            <Typography variant="body">원재료비</Typography>
            <Typography variant="body">{formatPrice(materialInfo.totalMonthlyMaterialCost)}</Typography>
          </View>
          <View style={[styles.summaryItem, styles.summaryTotal]}>
            <Typography variant="subtitle">총 월 운영 비용</Typography>
            <Typography variant="title" style={styles.totalPrice}>
              {formatPrice(totalMonthlyCost)}
            </Typography>
          </View>
        </View>
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return renderBasicInfoForm();
      case 'interior':
        return renderInteriorForm();
      case 'equipment':
        return renderEquipmentForm();
      case 'labor':
        return renderLaborForm();
      case 'material':
        return renderMaterialForm();
      case 'summary':
        return renderSummary();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      padding: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    subtitle: {
      marginTop: 8,
      color: '#666',
    },
    stepIndicator: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: '#fff',
    },
    progressBar: {
      height: 2,
      backgroundColor: '#eee',
      marginBottom: 16,
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    stepContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stepItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    stepCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
      backgroundColor: '#fff',
    },
    stepText: {
      fontSize: 11,
      color: '#666',
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      marginBottom: 20,
    },
    footer: {
      flexDirection: 'row',
      padding: 8,
      paddingBottom: 4,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      height: 48,
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    secondaryButton: {
      backgroundColor: '#f5f5f5',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    secondaryButtonText: {
      color: '#333',
      fontWeight: '600',
      fontSize: 14,
    },
    formContainer: {
      gap: 16,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontWeight: '600',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
      textAlign: 'right',
    },
    unit: {
      paddingHorizontal: 12,
      color: '#666',
      minWidth: 30,
      textAlign: 'center',
    },
    locationButton: {
      padding: 12,
      borderLeftWidth: 1,
      borderLeftColor: '#ddd',
    },
    tipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 12,
      backgroundColor: colors.primaryLight,
      borderRadius: 6,
    },
    tipText: {
      flex: 1,
      color: colors.primary,
    },
    section: {
      marginBottom: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: '#eee',
    },
    sectionTitle: {
      marginBottom: 16,
      color: colors.primary,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 8,
    },
    gridItem: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#eee',
      position: 'relative',
    },
    selectedGridItem: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    gridImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    gridContent: {
      padding: 12,
    },
    gridTitle: {
      fontWeight: '600',
      marginBottom: 4,
    },
    gridDescription: {
      color: '#666',
      marginBottom: 8,
      fontSize: 12,
    },
    gridPrice: {
      color: colors.primary,
      fontWeight: '600',
    },
    checkIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#fff',
      borderRadius: 12,
    },
    equipmentList: {
      gap: 8,
    },
    equipmentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      marginBottom: 8,
    },
    equipmentImage: {
      width: 60,
      height: 60,
      borderRadius: 4,
      marginRight: 12,
    },
    equipmentContent: {
      flex: 1,
    },
    equipmentName: {
      marginBottom: 4,
      fontWeight: '600',
    },
    equipmentDescription: {
      marginBottom: 4,
      color: '#666',
    },
    equipmentPrice: {
      color: colors.primary,
      fontWeight: '600',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    summaryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    summaryTotal: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      borderBottomWidth: 0,
    },
    totalContainer: {
      marginTop: 8,
      padding: 16,
      backgroundColor: colors.primary,
      borderRadius: 8,
      alignItems: 'center',
    },
    totalPrice: {
      marginTop: 8,
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '700',
    },
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      padding: 8,
    },
    counterButton: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#eee',
    },
    disabledButton: {
      backgroundColor: '#f8f8f8',
      borderColor: '#eee',
    },
    counterDisplay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    iconContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 32,
      gap: 4,
    },
    counterIcon: {
      marginHorizontal: 1,
    },
    counterNumber: {
      color: '#666',
      marginTop: 6,
      fontSize: 12,
    },
  });

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.header}>
        <Typography variant="title">창업 견적</Typography>
      </View>

      <View style={styles.stepIndicator}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((steps.findIndex((step) => step.id === currentStep) + 1) / steps.length) * 100}%`,
              },
            ]}
          />
        </View>
        <View style={styles.stepContainer}>
          {steps.map((step, index) => (
            <TouchableOpacity key={step.id} style={styles.stepItem} onPress={() => setCurrentStep(step.id)}>
              <View style={[styles.stepCircle, currentStep === step.id && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                <Ionicons name={step.icon as any} size={12} color={currentStep === step.id ? '#fff' : colors.primary} />
              </View>
              <Typography variant="caption" style={[styles.stepText, currentStep === step.id && { color: colors.primary, fontWeight: '600' }]} numberOfLines={1}>
                {step.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>{renderStepContent()}</ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => {
            const currentIndex = steps.findIndex((step) => step.id === currentStep);
            if (currentIndex > 0) {
              setCurrentStep(steps[currentIndex - 1].id);
            }
          }}
        >
          <Typography style={styles.secondaryButtonText}>이전</Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            const currentIndex = steps.findIndex((step) => step.id === currentStep);
            if (currentIndex < steps.length - 1) {
              setCurrentStep(steps[currentIndex + 1].id);
            }
          }}
        >
          <Typography style={styles.buttonText}>다음</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
