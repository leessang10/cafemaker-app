import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { formatDate } from '@/utils/helpers';
import { homeApi, Notice, Event, SuccessStory } from '@/api/homeApi';

export default function HomeScreen() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuthStore();
  const { currentTheme } = useAppStore();

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadNotices(),
        loadEvents(),
        loadSuccessStories(),
      ]);
    } catch (error) {
      console.error('Home data loading error:', error);
      Alert.alert('오류', '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadNotices = async () => {
    try {
      const data = await homeApi.getNotices(5);
      setNotices(data || []);
    } catch (error) {
      console.log('Notice loading failed, using empty array');
      setNotices([]);
    }
  };

  const loadEvents = async () => {
    try {
      const data = await homeApi.getEvents(3);
      setEvents(data || []);
    } catch (error) {
      console.log('Events loading failed, using empty array');
      setEvents([]);
    }
  };

  const loadSuccessStories = async () => {
    try {
      const data = await homeApi.getSuccessStories(4);
      setSuccessStories(data || []);
    } catch (error) {
      console.log('Success stories loading failed, using empty array');
      setSuccessStories([]);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View className="px-6 pt-4 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-lg text-gray-600 dark:text-gray-400">
            안녕하세요!
          </Text>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.user_metadata?.full_name || '창업가'}님
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-primary-500 rounded-full items-center justify-center">
          <Ionicons name="notifications" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4">
        <Text className="text-white font-semibold text-lg mb-2">
          창업 여정을 함께 시작해보세요
        </Text>
        <Text className="text-primary-100 mb-4">
          전문가 상담부터 견적 산출까지, 모든 과정을 지원합니다
        </Text>
        <TouchableOpacity className="bg-white/20 rounded-lg px-4 py-2 self-start">
          <Text className="text-white font-medium">견적 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View className="px-6 mb-6">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        빠른 서비스
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 mr-2 shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg items-center justify-center mb-3">
            <Ionicons name="calculator" size={24} color="#3B82F6" />
          </View>
          <Text className="font-semibold text-gray-900 dark:text-white">견적 산출</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            창업 비용 계산
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 mx-1 shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg items-center justify-center mb-3">
            <Ionicons name="chatbubbles" size={24} color="#10B981" />
          </View>
          <Text className="font-semibold text-gray-900 dark:text-white">전문가 상담</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            1:1 실시간 채팅
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 ml-2 shadow-sm border border-gray-100 dark:border-gray-700">
          <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg items-center justify-center mb-3">
            <Ionicons name="location" size={24} color="#8B5CF6" />
          </View>
          <Text className="font-semibold text-gray-900 dark:text-white">상권 분석</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            입지 정보 확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNotices = () => (
    <View className="px-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          공지사항
        </Text>
        <TouchableOpacity>
          <Text className="text-primary-500 font-medium">전체보기</Text>
        </TouchableOpacity>
      </View>
      
      {notices.length > 0 ? (
        <View className="space-y-3">
          {notices.slice(0, 3).map((notice) => (
            <TouchableOpacity
              key={notice.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white mb-1">
                    {notice.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2" numberOfLines={2}>
                    {notice.content}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(new Date(notice.created_at), 'YYYY.MM.DD')}
                  </Text>
                </View>
                <View className="ml-3">
                  <View className={`px-2 py-1 rounded-full ${
                    notice.category === 'important' 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      notice.category === 'important'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {notice.category === 'important' ? '중요' : '일반'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="bg-white dark:bg-gray-800 rounded-lg p-8 items-center">
          <Ionicons name="document-text-outline" size={48} color={currentTheme === 'dark' ? '#6B7280' : '#9CA3AF'} />
          <Text className="text-gray-500 dark:text-gray-400 mt-2">등록된 공지사항이 없습니다</Text>
        </View>
      )}
    </View>
  );

  const renderEvents = () => (
    <View className="px-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          다가오는 이벤트
        </Text>
        <TouchableOpacity>
          <Text className="text-primary-500 font-medium">전체보기</Text>
        </TouchableOpacity>
      </View>
      
      {events.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-4">
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                className="w-72 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg items-center justify-center">
                    <Ionicons name="calendar" size={24} color="#F97316" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(new Date(event.event_date), 'MM/DD')}
                    </Text>
                  </View>
                </View>
                
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3" numberOfLines={2}>
                  {event.description}
                </Text>
                
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={16} color={currentTheme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                    <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {event.location}
                    </Text>
                  </View>
                  <Text className="text-sm text-primary-500 font-medium">
                    {event.current_participants}/{event.max_participants}명
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="bg-white dark:bg-gray-800 rounded-lg p-8 items-center">
          <Ionicons name="calendar-outline" size={48} color={currentTheme === 'dark' ? '#6B7280' : '#9CA3AF'} />
          <Text className="text-gray-500 dark:text-gray-400 mt-2">예정된 이벤트가 없습니다</Text>
        </View>
      )}
    </View>
  );

  const renderSuccessStories = () => (
    <View className="px-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          성공 사례
        </Text>
        <TouchableOpacity>
          <Text className="text-primary-500 font-medium">전체보기</Text>
        </TouchableOpacity>
      </View>
      
      {successStories.length > 0 ? (
        <View className="flex-row flex-wrap justify-between">
          {successStories.slice(0, 4).map((story) => (
            <TouchableOpacity
              key={story.id}
              className="w-[48%] bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              {story.image_url && (
                <Image
                  source={{ uri: story.image_url }}
                  className="w-full h-24 rounded-lg mb-3"
                  resizeMode="cover"
                />
              )}
              
              <Text className="font-semibold text-gray-900 dark:text-white mb-2" numberOfLines={2}>
                {story.title}
              </Text>
              
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-2">
                  <Ionicons name="checkmark" size={14} color="#10B981" />
                </View>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {story.business_type}
                </Text>
              </View>
              
              <Text className="text-xs text-gray-500 dark:text-gray-500">
                {story.author_name} · {story.location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="bg-white dark:bg-gray-800 rounded-lg p-8 items-center">
          <Ionicons name="trophy-outline" size={48} color={currentTheme === 'dark' ? '#6B7280' : '#9CA3AF'} />
          <Text className="text-gray-500 dark:text-gray-400 mt-2">등록된 성공사례가 없습니다</Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderHeader()}
        {renderQuickActions()}
        {renderNotices()}
        {renderEvents()}
        {renderSuccessStories()}
        
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}