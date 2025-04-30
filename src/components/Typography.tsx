import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FONTS } from '../constants/theme';

export type TypographyProps = TextProps & {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
};

const Typography: React.FC<TypographyProps> = ({ style, variant = 'body', ...props }) => {
  const { colors } = useTheme();

  const getFontStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return <RNText style={[getFontStyle(), { color: colors.foreground }, style]} {...props} />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  body: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  caption: {
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
});

export default Typography;
