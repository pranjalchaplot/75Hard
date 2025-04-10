import { useColorScheme } from 'react-native';

const lightColors = {
  background: '#FFFFFF',
  text: '#1A1A1A',
  textSubtle: '#666666',
  primary: '#007AFF',
  secondary: '#5856D6',
  border: '#E5E5EA',
  cardBackground: '#F2F2F7',
  success: '#34C759',
  error: '#FF3B30',
};

const darkColors = {
  background: '#000000',
  text: '#FFFFFF',
  textSubtle: '#8E8E93',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  border: '#38383A',
  cardBackground: '#1C1C1E',
  success: '#30D158',
  error: '#FF453A',
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return {
    isDark,
    colors,
  };
}