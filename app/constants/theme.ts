import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#ffffff',
  foreground: '#171717',
  primary: '#936639',
  primaryDark: '#936639',
  secondary: '#4a6741',
  secondaryDark: '#3d543b',
  primaryBg: 'rgba(147, 102, 57, 0.1)',
  primaryLight: 'rgba(147, 102, 57, 0.5)',
  tabBarActive: '#936639',
  tabBarInactive: '#8E8E93',
};

export const DARK_COLORS = {
  background: '#0a0a0a',
  foreground: '#ededed',
  tabBarActive: '#936639',
  tabBarInactive: '#8E8E93',
};

export const FONTS = {
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  bold: 'Pretendard-Bold',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
