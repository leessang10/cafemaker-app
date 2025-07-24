import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { supabase } from '@/utils/supabase';
import { validateEmail } from '@/utils/helpers';

interface AuthFormData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

export default function AuthScreen() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const { setSession, setLoading: setAuthLoading, setError } = useAuthStore();
  const { currentTheme } = useAppStore();

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!validateEmail(formData.email)) {
      Alert.alert('오류', '올바른 이메일 주소를 입력해주세요.');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        Alert.alert('오류', '이름을 입력해주세요.');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setAuthLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.session) {
          setSession(data.session);
        }
      } else {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          setSession(data.session);
        } else {
          Alert.alert(
            '회원가입 완료',
            '이메일을 확인하여 계정을 활성화해주세요.',
            [{ text: '확인', onPress: () => setIsLogin(true) }]
          );
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
      Alert.alert('오류', error.message);
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
    try {
      setLoading(true);
      
      // Note: Social login implementation will need additional setup
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: 'your-app-scheme://auth/callback',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Social login error:', error);
      Alert.alert('오류', '소셜 로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderWelcomeScreen = () => (
    <View className="flex-1">
      <StatusBar style="light" />
      
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80' }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24 }}>
            {/* Logo Section */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ 
                width: 80, 
                height: 80, 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                borderRadius: 16, 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 24
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{ fontSize: 24 }}>☕</Text>
                </View>
              </View>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>CafeMaker</Text>
              {/* Debug info */}
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 8 }}>
                Email Form: {showEmailForm ? 'Visible' : 'Hidden'}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={{ paddingBottom: 48 }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: 25,
                  paddingVertical: 16,
                  marginBottom: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  console.log('Email button pressed');
                  setShowEmailForm(true);
                }}
                disabled={loading}
              >
                <Ionicons name="mail" size={20} color="#000" />
                <Text style={{ marginLeft: 8, color: 'black', fontWeight: '600', fontSize: 18 }}>
                  이메일로 로그인
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 25,
                  paddingVertical: 16,
                  marginBottom: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleSocialLogin('google')}
                disabled={loading}
              >
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={{ marginLeft: 8, color: 'white', fontWeight: '600', fontSize: 18 }}>
                  Google로 로그인
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 25,
                  paddingVertical: 16,
                  marginBottom: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleSocialLogin('naver')}
                disabled={loading}
              >
                <View style={{ width: 20, height: 20, backgroundColor: '#03C75A', borderRadius: 2 }} />
                <Text style={{ marginLeft: 8, color: 'white', fontWeight: '600', fontSize: 18 }}>
                  네이버로 로그인
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 25,
                  paddingVertical: 16,
                  marginBottom: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleSocialLogin('kakao')}
                disabled={loading}
              >
                <View style={{ width: 20, height: 20, backgroundColor: '#FEE500', borderRadius: 4 }} />
                <Text style={{ marginLeft: 8, color: 'white', fontWeight: '600', fontSize: 18 }}>
                  카카오로 로그인
                </Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>계정이 없으신가요? </Text>
                <TouchableOpacity onPress={() => {
                  setIsLogin(false);
                  setShowEmailForm(true);
                }}>
                  <Text style={{ color: 'white', fontWeight: '600', textDecorationLine: 'underline' }}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  const renderEmailForm = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => setShowEmailForm(false)}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">
            {isLogin ? '로그인' : '회원가입'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1 px-6"
        >
          <View className="flex-1 justify-center">
            {/* Form */}
            <View className="space-y-4">
              {!isLogin && (
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    이름
                  </Text>
                  <TextInput
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="이름을 입력하세요"
                    placeholderTextColor="#6B7280"
                    value={formData.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  이메일
                </Text>
                <TextInput
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor="#6B7280"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="비밀번호를 입력하세요"
                    placeholderTextColor="#6B7280"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {!isLogin && (
                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    비밀번호 확인
                  </Text>
                  <TextInput
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="비밀번호를 다시 입력하세요"
                    placeholderTextColor="#6B7280"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                className={`w-full py-4 rounded-lg mt-6 ${
                  loading ? 'bg-gray-400' : 'bg-black'
                }`}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
                </Text>
              </TouchableOpacity>

              {/* Toggle Auth Mode */}
              <TouchableOpacity
                className="mt-4"
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text className="text-center text-black font-medium">
                  {isLogin
                    ? '계정이 없으신가요? 회원가입'
                    : '이미 계정이 있으신가요? 로그인'}
                </Text>
              </TouchableOpacity>

              {/* Social Login */}
              <View className="mt-8">
                <View className="flex-row items-center mb-4">
                  <View className="flex-1 h-px bg-gray-300" />
                  <Text className="mx-4 text-gray-500">또는</Text>
                  <View className="flex-1 h-px bg-gray-300" />
                </View>

                <View className="space-y-3">
                  <TouchableOpacity
                    className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center"
                    onPress={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <Ionicons name="logo-google" size={20} color="#DB4437" />
                    <Text className="ml-2 text-gray-700 font-medium">
                      Google로 로그인
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center"
                    onPress={() => handleSocialLogin('kakao')}
                    disabled={loading}
                  >
                    <View className="w-5 h-5 bg-yellow-400 rounded" />
                    <Text className="ml-2 text-gray-700 font-medium">
                      카카오로 로그인
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );


  if (showEmailForm) {
    return renderEmailForm();
  }


  return (
    <View className="flex-1">
      {renderWelcomeScreen()}
    </View>
  );
}