import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { authApi } from '@/api/authApi';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightElement,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800"
      onPress={onPress}
    >
      <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center mr-3">
        <Ionicons name={icon} size={20} color="#6B7280" />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 dark:text-white font-medium">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightElement || (showArrow && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color="#9CA3AF" 
        />
      ))}
    </TouchableOpacity>
  );
};

export default function MoreScreen() {
  const { user, clearAuth } = useAuthStore();
  const { currentTheme, setTheme } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await authApi.signOut();
              clearAuth();
            } catch (error: any) {
              console.error('Logout error:', error);
              Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleThemeToggle = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleContact = () => {
    Alert.alert(
      '문의하기',
      '어떤 방법으로 문의하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '이메일',
          onPress: () => Linking.openURL('mailto:support@cafemaker.com'),
        },
        {
          text: '전화',
          onPress: () => Linking.openURL('tel:+821234567890'),
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://cafemaker.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://cafemaker.com/terms');
  };

  const handleOpenSource = () => {
    Alert.alert(
      '오픈소스 라이선스',
      '사용된 오픈소스 라이브러리 정보를 확인하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            // 오픈소스 라이선스 페이지로 이동
            Linking.openURL('https://cafemaker.com/licenses');
          },
        },
      ]
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      '앱 평가',
      '앱스토어에서 앱을 평가해주세요!',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '평가하기',
          onPress: () => {
            // 앱스토어 링크 (실제 앱 ID로 변경 필요)
            Linking.openURL('https://apps.apple.com/app/id123456789');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white dark:bg-gray-800 px-6 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            더보기
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            설정 및 앱 정보를 확인하세요
          </Text>
        </View>

        {/* User Profile Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <View className="p-4 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              계정 정보
            </Text>
          </View>
          
          <View className="p-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white font-medium">
                  {user?.user_metadata?.full_name || '사용자'}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {user?.email || '이메일 없음'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <View className="p-4 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              설정
            </Text>
          </View>
          
          <MenuItem
            icon="moon"
            title="다크 모드"
            subtitle="화면 테마를 변경합니다"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <Switch
                value={currentTheme === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={currentTheme === 'dark' ? '#FFFFFF' : '#F3F4F6'}
              />
            }
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="notifications"
            title="알림 설정"
            subtitle="푸시 알림 및 이메일 알림 설정"
            onPress={() => Alert.alert('알림', '알림 설정 페이지는 준비 중입니다.')}
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="language"
            title="언어 설정"
            subtitle="앱 사용 언어를 변경합니다"
            onPress={() => Alert.alert('언어', '언어 설정은 준비 중입니다.')}
          />
        </View>

        {/* Support Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <View className="p-4 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              고객 지원
            </Text>
          </View>
          
          <MenuItem
            icon="help-circle"
            title="자주 묻는 질문"
            subtitle="FAQ 및 도움말을 확인하세요"
            onPress={() => Alert.alert('FAQ', 'FAQ 페이지로 이동합니다.')}
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="mail"
            title="문의하기"
            subtitle="이메일 또는 전화로 문의하세요"
            onPress={handleContact}
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="star"
            title="앱 평가"
            subtitle="앱스토어에서 리뷰를 남겨주세요"
            onPress={handleRateApp}
          />
        </View>

        {/* Legal Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <View className="p-4 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              약관 및 정책
            </Text>
          </View>
          
          <MenuItem
            icon="document-text"
            title="서비스 이용약관"
            subtitle="CafeMaker 서비스 이용약관"
            onPress={handleTermsOfService}
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="shield-checkmark"
            title="개인정보 처리방침"
            subtitle="개인정보 보호 정책을 확인하세요"
            onPress={handlePrivacyPolicy}
          />
          
          <View className="h-px bg-gray-100 dark:bg-gray-700 ml-16" />
          
          <MenuItem
            icon="code"
            title="오픈소스 라이선스"
            subtitle="사용된 오픈소스 라이브러리 정보"
            onPress={handleOpenSource}
          />
        </View>

        {/* App Info Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <View className="p-4 border-b border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              앱 정보
            </Text>
          </View>
          
          <MenuItem
            icon="information-circle"
            title="버전 정보"
            subtitle="v1.0.0 (Build 1)"
            onPress={() => {}}
            showArrow={false}
          />
        </View>

        {/* Logout Section */}
        <View className="bg-white dark:bg-gray-800 mt-4 mx-4 rounded-xl shadow-sm">
          <MenuItem
            icon="log-out"
            title={loading ? "로그아웃 중..." : "로그아웃"}
            subtitle="계정에서 안전하게 로그아웃합니다"
            onPress={handleLogout}
            showArrow={false}
            rightElement={
              loading ? (
                <View className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
              ) : null
            }
          />
        </View>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}