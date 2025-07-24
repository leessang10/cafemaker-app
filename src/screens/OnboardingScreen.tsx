import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { supabase } from '@utils/supabase';

interface OnboardingData {
  businessName: string;
  businessType: string;
  businessLocation: string;
  experience: string;
  budget: string;
  goals: string;
}

const businessTypes = [
  { id: 'cafe', label: '카페', icon: 'cafe' },
  { id: 'restaurant', label: '음식점', icon: 'restaurant' },
  { id: 'bakery', label: '베이커리', icon: 'storefront' },
  { id: 'dessert', label: '디저트 전문점', icon: 'ice-cream' },
  { id: 'franchise', label: '프랜차이즈', icon: 'business' },
  { id: 'other', label: '기타', icon: 'ellipsis-horizontal' },
];

const experienceLevels = [
  { id: 'beginner', label: '초보자 (경험 없음)' },
  { id: 'some', label: '약간의 경험 있음' },
  { id: 'experienced', label: '경험이 많음' },
  { id: 'expert', label: '전문가 수준' },
];

const budgetRanges = [
  { id: 'under-30', label: '3,000만원 미만' },
  { id: '30-50', label: '3,000만원 - 5,000만원' },
  { id: '50-100', label: '5,000만원 - 1억원' },
  { id: 'over-100', label: '1억원 이상' },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    businessType: '',
    businessLocation: '',
    experience: '',
    budget: '',
    goals: '',
  });

  const { user } = useAuthStore();
  const { currentTheme, completeOnboarding } = useAppStore();

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      // Save profile data to Supabase
      const profileData = {
        id: user?.id,
        email: user?.email || '',
        full_name: user?.user_metadata?.full_name || '',
        store_name: data.businessName,
        store_address: data.businessLocation,
        preferences: {
          business_type: data.businessType,
          experience_level: data.experience,
          budget_range: data.budget,
          goals: data.goals,
          onboarding_completed: true,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) throw error;

      // Complete onboarding in app store
      completeOnboarding();
      
      Alert.alert(
        '환영합니다!',
        '온보딩이 완료되었습니다. CafeMaker와 함께 성공적인 창업을 시작해보세요!',
        [{ text: '시작하기', style: 'default' }]
      );
    } catch (error: any) {
      console.error('Onboarding error:', error);
      const errorMessage = error?.message || error?.error_description || '온보딩 완료 중 오류가 발생했습니다.';
      Alert.alert('오류', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (!data.businessName.trim()) {
          Alert.alert('알림', '사업명을 입력해주세요.');
          return false;
        }
        break;
      case 1:
        if (!data.businessType) {
          Alert.alert('알림', '사업 유형을 선택해주세요.');
          return false;
        }
        break;
      case 2:
        if (!data.businessLocation.trim()) {
          Alert.alert('알림', '사업 지역을 입력해주세요.');
          return false;
        }
        break;
      case 3:
        if (!data.experience) {
          Alert.alert('알림', '경험 수준을 선택해주세요.');
          return false;
        }
        break;
      case 4:
        if (!data.budget) {
          Alert.alert('알림', '예산 범위를 선택해주세요.');
          return false;
        }
        break;
    }
    return true;
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0: return data.businessName.trim().length > 0;
      case 1: return data.businessType.length > 0;
      case 2: return data.businessLocation.trim().length > 0;
      case 3: return data.experience.length > 0;
      case 4: return data.budget.length > 0;
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="space-y-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="business" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                사업명을 알려주세요
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                어떤 이름으로 사업을 시작하시나요?
              </Text>
            </View>

            <View>
              <TextInput
                className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
                placeholder="예: 따뜻한 카페, 맛있는 베이커리"
                placeholderTextColor={currentTheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={data.businessName}
                onChangeText={(text) => setData({ ...data, businessName: text })}
                autoCapitalize="words"
                maxLength={50}
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View className="space-y-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="storefront" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                사업 유형을 선택해주세요
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                어떤 종류의 사업을 계획하고 계신가요?
              </Text>
            </View>

            <View className="space-y-3">
              {businessTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  className={`w-full p-4 rounded-lg border-2 flex-row items-center ${
                    data.businessType === type.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                  onPress={() => setData({ ...data, businessType: type.id })}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={24}
                    color={data.businessType === type.id ? '#3B82F6' : (currentTheme === 'dark' ? '#9CA3AF' : '#6B7280')}
                  />
                  <Text className={`ml-3 text-lg font-medium ${
                    data.businessType === type.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View className="space-y-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="location" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                사업 지역을 알려주세요
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                어느 지역에서 사업을 시작하실 예정인가요?
              </Text>
            </View>

            <View>
              <TextInput
                className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
                placeholder="예: 서울시 강남구, 부산시 해운대구"
                placeholderTextColor={currentTheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={data.businessLocation}
                onChangeText={(text) => setData({ ...data, businessLocation: text })}
                autoCapitalize="words"
                maxLength={100}
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View className="space-y-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="school" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                경험 수준을 선택해주세요
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                창업 또는 관련 업종 경험이 어느 정도이신가요?
              </Text>
            </View>

            <View className="space-y-3">
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  className={`w-full p-4 rounded-lg border-2 ${
                    data.experience === level.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                  onPress={() => setData({ ...data, experience: level.id })}
                >
                  <Text className={`text-lg font-medium ${
                    data.experience === level.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View className="space-y-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="card" size={24} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                예산 범위를 선택해주세요
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center mt-2">
                창업을 위해 준비하신 대략적인 예산 범위는?
              </Text>
            </View>

            <View className="space-y-3">
              {budgetRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  className={`w-full p-4 rounded-lg border-2 ${
                    data.budget === range.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                  onPress={() => setData({ ...data, budget: range.id })}
                >
                  <Text className={`text-lg font-medium ${
                    data.budget === range.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-8">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                목표나 기대사항 (선택사항)
              </Text>
              <TextInput
                className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="어떤 목표를 가지고 계신가요?"
                placeholderTextColor={currentTheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={data.goals}
                onChangeText={(text) => setData({ ...data, goals: text })}
                multiline
                numberOfLines={3}
                maxLength={200}
                textAlignVertical="top"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Progress Bar */}
      <View className="px-6 pt-12 pb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {currentStep + 1} / {totalSteps}
          </Text>
          <Text className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </Text>
        </View>
        <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <View 
            className="h-2 bg-primary-500 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center py-8">
          {renderStep()}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row space-x-4">
          {currentStep > 0 && (
            <TouchableOpacity
              className="flex-1 py-4 border border-gray-300 dark:border-gray-600 rounded-lg"
              onPress={handleBack}
            >
              <Text className="text-center font-semibold text-gray-700 dark:text-gray-300">
                이전
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            className={`flex-1 py-4 rounded-lg ${
              canProceed() && !loading
                ? 'bg-primary-500'
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
            onPress={handleNext}
            disabled={!canProceed() || loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? '저장 중...' : currentStep === totalSteps - 1 ? '완료' : '다음'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}