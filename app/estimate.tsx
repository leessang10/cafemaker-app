'use client';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BeansSelector from '../src/components/estimate/BeansSelector';
import EquipmentSelector from '../src/components/estimate/EquipmentSelector';
import InteriorSelector from '../src/components/estimate/InteriorSelector';
import MenuSelector from '../src/components/estimate/MenuSelector';
import SpaceSelector from '../src/components/estimate/SpaceSelector';

type SpaceType = 'small' | 'medium' | 'large' | 'xl';
type InteriorType = 'minimal' | 'industrial' | 'natural' | 'luxury';
type EquipmentType = 'basic' | 'standard' | 'premium' | 'custom';
type MenuType = 'basic' | 'standard' | 'premium' | 'signature';
type BeansType = 'house' | 'single' | 'premium' | 'custom';

// 평형별 기본 가격 (평당)
const SPACE_PRICES: Record<SpaceType, number> = {
  small: 1000000, // 10평 이하
  medium: 900000, // 11-20평
  large: 800000, // 21-30평
  xl: 700000, // 31평 이상
};

// 인테리어 스타일별 가격 (평당)
const INTERIOR_PRICES: Record<InteriorType, number> = {
  minimal: 800000,
  industrial: 1000000,
  natural: 900000,
  luxury: 1500000,
};

// 장비 패키지별 가격
const EQUIPMENT_PRICES: Record<EquipmentType, number> = {
  basic: 25000000,
  standard: 35000000,
  premium: 50000000,
  custom: 0,
};

// 메뉴 구성별 초기 셋업 비용
const MENU_SETUP_COSTS: Record<MenuType, number> = {
  basic: 3000000,
  standard: 5000000,
  premium: 8000000,
  signature: 12000000,
};

// 원두 kg당 가격
const BEANS_PRICES: Record<BeansType, number> = {
  house: 25000,
  single: 35000,
  premium: 45000,
  custom: 55000,
};

const steps = [
  {
    title: '평형 선택',
    description: '카페의 규모를 선택해주세요',
    key: 'space',
  },
  {
    title: '인테리어 스타일',
    description: '카페의 분위기를 결정할 인테리어 스타일을 선택해주세요',
    key: 'interior',
  },
  {
    title: '카페 장비',
    description: '필요한 카페 장비 패키지를 선택해주세요',
    key: 'equipment',
  },
  {
    title: '메뉴 구성',
    description: '카페에서 제공할 메뉴 구성을 선택해주세요',
    key: 'menu',
  },
  {
    title: '원두 선택',
    description: '카페의 시그니처가 될 원두를 선택해주세요',
    key: 'beans',
  },
];

export default function EstimatePage() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSpace, setSelectedSpace] = useState<SpaceType | ''>('');
  const [selectedInterior, setSelectedInterior] = useState<InteriorType | ''>('');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | ''>('');
  const [selectedMenu, setSelectedMenu] = useState<MenuType | ''>('');
  const [selectedBeans, setSelectedBeans] = useState<BeansType | ''>('');

  // 총 견적 계산
  const totalEstimate = useMemo(() => {
    if (!selectedSpace || !selectedInterior || !selectedEquipment || !selectedMenu || !selectedBeans) {
      return 0;
    }

    // 평형에 따른 기본 공사비 계산
    const spaceSize = selectedSpace === 'small' ? 10 : selectedSpace === 'medium' ? 20 : selectedSpace === 'large' ? 30 : 40;

    const baseConstructionCost = spaceSize * SPACE_PRICES[selectedSpace];
    const interiorCost = spaceSize * INTERIOR_PRICES[selectedInterior];
    const equipmentCost = EQUIPMENT_PRICES[selectedEquipment];
    const menuSetupCost = MENU_SETUP_COSTS[selectedMenu];
    const initialBeansCost = BEANS_PRICES[selectedBeans] * 20; // 초기 20kg 기준

    return baseConstructionCost + interiorCost + equipmentCost + menuSetupCost + initialBeansCost;
  }, [selectedSpace, selectedInterior, selectedEquipment, selectedMenu, selectedBeans]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedSpace;
      case 1:
        return !!selectedInterior;
      case 2:
        return !!selectedEquipment;
      case 3:
        return !!selectedMenu;
      case 4:
        return !!selectedBeans;
      default:
        return false;
    }
  };

  const handleReset = () => {
    setSelectedSpace('');
    setSelectedInterior('');
    setSelectedEquipment('');
    setSelectedMenu('');
    setSelectedBeans('');
    setCurrentStep(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#EBF5FF', '#FFFFFF']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>카페 창업 견적 계산</Text>
          <Text style={styles.subtitle}>단계별로 선택하여 예상 견적을 계산해보세요</Text>
        </View>

        <View style={styles.progressContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stepIndicators}>
            {steps.map((step, index) => (
              <View key={step.key} style={styles.stepIndicator}>
                <View style={[styles.stepCircle, currentStep > index && styles.completedStep, currentStep === index && styles.activeStep]}>
                  <Text style={[styles.stepNumber, (currentStep === index || currentStep > index) && styles.activeStepNumber]}>{index + 1}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentStep / (steps.length - 1)) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepHeading}>{steps[currentStep].title}</Text>
            <Text style={styles.stepDescription}>{steps[currentStep].description}</Text>
          </View>

          <View style={styles.selectorContainer}>
            {currentStep === 0 && <SpaceSelector selectedValue={selectedSpace} onSelect={setSelectedSpace} />}
            {currentStep === 1 && <InteriorSelector selectedValue={selectedInterior} onSelect={setSelectedInterior} />}
            {currentStep === 2 && <EquipmentSelector selectedValue={selectedEquipment} onSelect={setSelectedEquipment} />}
            {currentStep === 3 && <MenuSelector selectedValue={selectedMenu} onSelect={setSelectedMenu} />}
            {currentStep === 4 && <BeansSelector selectedValue={selectedBeans} onSelect={setSelectedBeans} />}
          </View>
        </View>

        <View style={styles.footer}>
          {currentStep === steps.length - 1 ? (
            <View style={styles.resultContainer}>
              <View style={styles.estimateCard}>
                <Text style={styles.estimateTitle}>예상 견적 합계</Text>
                <Text style={styles.estimateAmount}>{totalEstimate > 0 ? `${totalEstimate.toLocaleString()}원` : '모든 항목을 선택해주세요'}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={handleReset}>
                  <Text style={styles.resetButtonText}>다시 계산하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.consultButton]} onPress={() => navigation.navigate('Consult' as never)}>
                  <Text style={styles.consultButtonText}>상담 신청하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.navigation}>
              <TouchableOpacity style={[styles.navButton, currentStep === 0 && styles.disabledButton]} onPress={handlePrevious} disabled={currentStep === 0}>
                <Text style={[styles.navButtonText, currentStep === 0 && styles.disabledButtonText]}>이전 단계</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navButton, styles.primaryButton, !canProceed() && styles.disabledButton]} onPress={handleNext} disabled={!canProceed()}>
                <Text style={[styles.navButtonText, styles.primaryButtonText, !canProceed() && styles.disabledButtonText]}>다음 단계</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  stepIndicators: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  stepIndicator: {
    alignItems: 'center',
    marginHorizontal: 12,
    width: 80,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#3F83F8',
  },
  completedStep: {
    backgroundColor: '#3F83F8',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3F83F8',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  stepHeader: {
    marginBottom: 16,
  },
  stepHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectorContainer: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3F83F8',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3F83F8',
    borderColor: '#3F83F8',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F83F8',
  },
  primaryButtonText: {
    color: '#fff',
  },
  disabledButtonText: {
    color: '#999',
  },
  resultContainer: {
    gap: 16,
  },
  estimateCard: {
    backgroundColor: '#EBF5FF',
    padding: 16,
    borderRadius: 12,
  },
  estimateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  estimateAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F83F8',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
  },
  consultButton: {
    backgroundColor: '#3F83F8',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  consultButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
