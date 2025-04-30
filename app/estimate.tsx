import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
  monthlyRent: string;
}

interface InteriorOption {
  id: string;
  name: string;
  price: number;
  selected: boolean;
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
}

interface EquipmentInfo {
  coffeeMachines: EquipmentOption[];
  grinders: EquipmentOption[];
  refrigerators: EquipmentOption[];
  others: EquipmentOption[];
  totalPrice: number;
  [key: string]: EquipmentOption[] | number;
}

export default function EstimateScreen() {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    location: '',
    size: '',
    monthlyRent: '',
  });
  const [interiorInfo, setInteriorInfo] = useState<InteriorInfo>({
    basicOptions: [
      { id: 'floor', name: '바닥 공사', price: 1000000, selected: true },
      { id: 'wall', name: '벽지 공사', price: 800000, selected: true },
      { id: 'ceiling', name: '천장 공사', price: 500000, selected: true },
      { id: 'lighting', name: '기본 조명', price: 300000, selected: true },
      { id: 'bathroom', name: '화장실 공사', price: 1500000, selected: true },
    ],
    customOptions: [
      { id: 'counter', name: '카운터 디자인', price: 2000000, selected: false },
      { id: 'furniture', name: '테이블/의자', price: 3000000, selected: false },
      { id: 'style', name: '인테리어 스타일', price: 2500000, selected: false },
      { id: 'special', name: '특수 시설', price: 4000000, selected: false },
    ],
    totalPrice: 4100000,
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
      },
      {
        id: 'cm2',
        category: 'coffeeMachine',
        name: '누오바 시몬넬리 아펠리아 II',
        brand: 'Nuova Simonelli',
        price: 8000000,
        selected: false,
        description: '1그룹, 1.8L 보일러, PID 컨트롤',
      },
      {
        id: 'cm3',
        category: 'coffeeMachine',
        name: '라 시발레 미니',
        brand: 'La Cimbali',
        price: 12000000,
        selected: false,
        description: '1그룹, 2.5L 보일러, PID 컨트롤',
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
      },
      {
        id: 'g2',
        category: 'grinder',
        name: '누오바 시몬넬리 MDX',
        brand: 'Nuova Simonelli',
        price: 2500000,
        selected: false,
        description: '65mm 플랫 버, 1.2kg 호퍼',
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
      },
      {
        id: 'r2',
        category: 'refrigerator',
        name: '삼성 비스포크',
        brand: 'Samsung',
        price: 2500000,
        selected: false,
        description: '2도어, 700L, 냉장/냉동',
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
      },
      {
        id: 'o2',
        category: 'other',
        name: 'POS 시스템',
        brand: 'KICC',
        price: 1500000,
        selected: false,
        description: '기본 POS 시스템',
      },
    ],
    totalPrice: 0,
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
          <TextInput style={styles.input} placeholder="예: 300" value={basicInfo.monthlyRent} onChangeText={(text) => setBasicInfo({ ...basicInfo, monthlyRent: text })} keyboardType="numeric" />
          <Typography variant="caption" style={styles.unit}>
            만원
          </Typography>
        </View>
      </View>

      <View style={styles.tipContainer}>
        <Ionicons name="information-circle" size={16} color={colors.primary} />
        <Typography variant="caption" style={styles.tipText}>
          정확한 정보를 입력할수록 더 정확한 견적을 받을 수 있습니다.
        </Typography>
      </View>
    </View>
  );

  const renderInteriorForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          기본 인테리어
        </Typography>
        <View style={styles.optionList}>
          {interiorInfo.basicOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionItem, option.selected && { borderColor: colors.primary }]}
              onPress={() => {
                const updatedOptions = interiorInfo.basicOptions.map((item) => (item.id === option.id ? { ...item, selected: !item.selected } : item));
                setInteriorInfo({
                  ...interiorInfo,
                  basicOptions: updatedOptions,
                  totalPrice: calculateTotalPrice(updatedOptions, interiorInfo.customOptions),
                });
              }}
            >
              <View style={styles.optionContent}>
                <Typography variant="body" style={styles.optionName}>
                  {option.name}
                </Typography>
                <Typography variant="body" style={styles.optionPrice}>
                  {formatPrice(option.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, option.selected && { backgroundColor: colors.primary }]}>{option.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitle" style={styles.sectionTitle}>
          커스텀 옵션
        </Typography>
        <View style={styles.optionList}>
          {interiorInfo.customOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionItem, option.selected && { borderColor: colors.primary }]}
              onPress={() => {
                const updatedOptions = interiorInfo.customOptions.map((item) => (item.id === option.id ? { ...item, selected: !item.selected } : item));
                setInteriorInfo({
                  ...interiorInfo,
                  customOptions: updatedOptions,
                  totalPrice: calculateTotalPrice(interiorInfo.basicOptions, updatedOptions),
                });
              }}
            >
              <View style={styles.optionContent}>
                <Typography variant="body" style={styles.optionName}>
                  {option.name}
                </Typography>
                <Typography variant="body" style={styles.optionPrice}>
                  {formatPrice(option.price)}
                </Typography>
              </View>
              <View style={[styles.checkbox, option.selected && { backgroundColor: colors.primary }]}>{option.selected && <Ionicons name="checkmark" size={16} color="#fff" />}</View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Typography variant="subtitle">총 인테리어 비용</Typography>
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
          커피 머신
        </Typography>
        <View style={styles.equipmentList}>
          {equipmentInfo.coffeeMachines.map((equipment) => (
            <TouchableOpacity key={equipment.id} style={[styles.equipmentItem, equipment.selected && { borderColor: colors.primary }]} onPress={() => toggleEquipmentSelection(equipment)}>
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              기본 정보 입력
            </Typography>
            {renderBasicInfoForm()}
          </View>
        );
      case 'interior':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              인테리어 견적
            </Typography>
            {renderInteriorForm()}
          </View>
        );
      case 'equipment':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              장비 견적
            </Typography>
            {renderEquipmentForm()}
          </View>
        );
      case 'labor':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              인건비 견적
            </Typography>
            {/* 인건비 견적 폼 */}
          </View>
        );
      case 'material':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              원재료 견적
            </Typography>
            {/* 원재료 견적 폼 */}
          </View>
        );
      case 'summary':
        return (
          <View style={styles.stepContent}>
            <Typography variant="subtitle" style={styles.stepTitle}>
              총 견적 분석
            </Typography>
            {/* 총 견적 분석 결과 */}
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    subtitle: {
      marginTop: 8,
      color: '#666',
    },
    stepIndicator: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      height: 32,
      overflow: 'hidden',
    },
    stepContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    stepItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      minWidth: 60,
      height: 28,
    },
    stepText: {
      fontSize: 10,
      marginLeft: 4,
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
      backgroundColor: '#eee',
    },
    buttonText: {
      color: '#fff',
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
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
    },
    unit: {
      paddingHorizontal: 12,
      color: '#666',
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
      marginBottom: 20,
    },
    sectionTitle: {
      marginBottom: 12,
    },
    optionList: {
      gap: 8,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
    },
    optionContent: {
      flex: 1,
    },
    optionName: {
      marginBottom: 4,
    },
    optionPrice: {
      color: '#666',
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
    totalContainer: {
      marginTop: 20,
      padding: 12,
      backgroundColor: colors.primaryLight,
      borderRadius: 6,
      alignItems: 'center',
    },
    totalPrice: {
      marginTop: 4,
      color: colors.primary,
    },
    equipmentList: {
      gap: 8,
    },
    equipmentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
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
      color: '#007AFF',
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.header}>
        <Typography variant="title">창업 견적</Typography>
        <Typography variant="body" style={styles.subtitle}>
          단계별로 진행하여 나만의 카페 창업 견적을 만들어보세요.
        </Typography>
      </View>

      <View style={styles.stepIndicator}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stepContainer}>
          {steps.map((step, index) => (
            <TouchableOpacity key={step.id} style={[styles.stepItem, currentStep === step.id && { backgroundColor: colors.primary }]} onPress={() => setCurrentStep(step.id)}>
              <Ionicons name={step.icon as any} size={12} color={currentStep === step.id ? '#fff' : colors.primary} />
              <Typography variant="caption" style={[styles.stepText, currentStep === step.id && { color: '#fff' }]} numberOfLines={1}>
                {step.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
          <Typography style={styles.buttonText}>이전</Typography>
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
