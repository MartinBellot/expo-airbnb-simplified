import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function FilterChip({ label, icon, selected, onPress, index }) {
  const { theme, isDarkMode } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(selected ? 1.02 : 1, {
            damping: 12,
            stiffness: 200,
          }),
        },
      ],
    };
  });

  return (
    <AnimatedTouchable
      entering={FadeInRight.delay(index * 50).duration(400).springify()}
      style={[
        styles.chip,
        animatedStyle,
        {
          backgroundColor: selected ? theme.primary : theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={18} 
          color={selected ? (isDarkMode ? theme.textPrimary : '#FFFFFF') : theme.textSecondary} 
        />
      )}
      <Text
        style={[
          styles.chipText,
          {
            color: selected ? (isDarkMode ? theme.textPrimary : '#FFFFFF') : theme.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    gap: 8,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
